import "dotenv/config";
import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Simple in-memory rate limiter
const rateLimit = new Map();

const app = express();
app.use(cors());
app.use(express.json());

// Rate limiting middleware
const rateLimitMiddleware = (req, res, next) => {
  const clientId = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  const windowMs = 60000; // 1 minute window
  const maxRequests = 10; // Max 10 requests per minute per IP
  
  // Cleanup old entries periodically
  if (Math.random() < 0.01) { // 1% chance to cleanup on each request
    for (const [key, value] of rateLimit.entries()) {
      if (now > value.resetTime) {
        rateLimit.delete(key);
      }
    }
  }
  
  if (!rateLimit.has(clientId)) {
    rateLimit.set(clientId, { count: 1, resetTime: now + windowMs });
    return next();
  }
  
  const clientData = rateLimit.get(clientId);
  
  if (now > clientData.resetTime) {
    clientData.count = 1;
    clientData.resetTime = now + windowMs;
    return next();
  }
  
  if (clientData.count >= maxRequests) {
    return res.status(429).json({
      error: "Too many requests. Please try again later.",
      retryAfter: Math.ceil((clientData.resetTime - now) / 1000)
    });
  }
  
  clientData.count++;
  next();
};

// API key: add your Gemini API key here or via GEMINI_API_KEY env variable
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "YOUR_GEMINI_API_KEY_HERE";

const genAI = GEMINI_API_KEY.startsWith("YOUR_") ? null : new GoogleGenerativeAI(GEMINI_API_KEY);

const PROMPT = `You are a career guidance expert. Given a user's skills and interests, provide structured career recommendations.

Respond ONLY with valid JSON in this exact format (no markdown, no code blocks):
{
  "careerDomains": ["Domain 1", "Domain 2", "Domain 3"],
  "careerRoles": [
    { "role": "Role Name", "domain": "Domain", "match": "brief reason" }
  ],
  "careerPath": {
    "shortTerm": ["Step 1", "Step 2"],
    "mediumTerm": ["Step 1", "Step 2"],
    "longTerm": ["Step 1", "Step 2"]
  },
  "learningRoadmap": {
    "beginner": ["Skill/Topic 1", "Skill/Topic 2", "Skill/Topic 3"],
    "intermediate": ["Skill/Topic 1", "Skill/Topic 2", "Skill/Topic 3"],
    "advanced": ["Skill/Topic 1", "Skill/Topic 2", "Skill/Topic 3"]
  }
}

Skills: {{SKILLS}}
Interests: {{INTERESTS}}

Provide 3-5 career domains, 4-8 career roles, and clear actionable steps for career path and learning roadmap.`;

app.post("/api/recommend", rateLimitMiddleware, async (req, res) => {
  const { skills = [], interests = [] } = req.body;

  if (!Array.isArray(skills) || !Array.isArray(interests)) {
    return res.status(400).json({ error: "skills and interests must be arrays" });
  }

  if (!genAI) {
    return res.status(503).json({
      error: "Gemini API key not configured. Add GEMINI_API_KEY to your environment or set it in server/index.js",
      fallback: getFallbackRecommendations(skills, interests),
    });
  }

  try {
    const prompt = PROMPT
      .replace("{{SKILLS}}", skills.length ? skills.join(", ") : "Not specified")
      .replace("{{INTERESTS}}", interests.length ? interests.join(", ") : "Not specified");

    const modelName = process.env.GEMINI_MODEL || "gemini-2.5-flash-lite";
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const json = parseJsonResponse(text);
    return res.json(json);
  } catch (err) {
    console.error("Gemini API error:", err);
    
    // Check for specific Gemini API quota/rate limit errors
    if (err.message?.includes('quota') || err.message?.includes('rate limit') || err.status === 429) {
      const fallback = getFallbackRecommendations(skills, interests);
      return res.status(429).json({
        error: "API quota exceeded. Using fallback recommendations.",
        fallback: fallback,
        ...fallback,
      });
    }
    
    const fallback = getFallbackRecommendations(skills, interests);
    return res.status(502).json({
      error: "AI service temporarily unavailable. Returning fallback recommendations.",
      fallback: fallback,
      ...fallback,
    });
  }
});

function parseJsonResponse(text) {
  const cleaned = text
    .replace(/```json\n?/gi, "")
    .replace(/```\n?/g, "")
    .trim();
  const match = cleaned.match(/\{[\s\S]*\}/);
  if (match) return JSON.parse(match[0]);
  throw new Error("No JSON object found in response");
}

function getFallbackRecommendations(skills, interests) {
  const all = [...skills, ...interests].map((s) => s.toLowerCase());
  const hasTech = all.some((s) => ["javascript", "react", "python", "node"].some((t) => s.includes(t)));
  const hasData = all.some((s) => ["data", "python", "analytics", "machine learning"].some((t) => s.includes(t)));
  const hasDesign = all.some((s) => ["design", "ui", "ux", "figma"].some((t) => s.includes(t)));

  const domains = [];
  if (hasTech) domains.push("Software Development", "Web Development");
  if (hasData) domains.push("Data Science", "AI/ML");
  if (hasDesign) domains.push("Product Design", "UX Design");
  if (domains.length === 0) domains.push("Technology", "Business", "Creative Arts");

  return {
    careerDomains: [...new Set(domains)].slice(0, 5),
    careerRoles: [
      { role: "Software Engineer", domain: "Technology", match: "Matches technical skills" },
      { role: "Data Analyst", domain: "Data Science", match: "Matches analytical interests" },
      { role: "UX Designer", domain: "Design", match: "Matches design interests" },
    ].slice(0, 6),
    careerPath: {
      shortTerm: ["Build foundational skills", "Create a portfolio", "Network with professionals"],
      mediumTerm: ["Gain practical experience", "Earn certifications", "Contribute to projects"],
      longTerm: ["Lead projects", "Mentor others", "Specialize in your domain"],
    },
    learningRoadmap: {
      beginner: ["Learn core fundamentals", "Complete online courses", "Build small projects"],
      intermediate: ["Deepen expertise", "Work on real projects", "Join communities"],
      advanced: ["Master advanced topics", "Contribute to open source", "Publish or speak"],
    },
  };
}

app.get("/api/health", (req, res) => {
  res.json({ ok: true, geminiConfigured: !!genAI });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  if (!genAI) {
    console.warn("⚠️  GEMINI_API_KEY not set. Add your API key to enable AI recommendations.");
  }
});
