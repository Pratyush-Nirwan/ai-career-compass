import Layout from "../components/Layout";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { downloadCareerPdf } from "../utils/exportPdf";

function Dashboard() {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState(null);
  const [savedSkills, setSavedSkills] = useState([]);
  const [savedInterests, setSavedInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Load saved data from localStorage
    const savedRecs = localStorage.getItem("careerRecommendations");
    const savedSkillsData = localStorage.getItem("savedSkills");
    const savedInterestsData = localStorage.getItem("savedInterests");

    if (savedRecs) {
      try {
        const recs = JSON.parse(savedRecs);
        setRecommendations(recs.fallback || recs);
      } catch (error) {
        console.error("Error loading recommendations:", error);
      }
    }

    if (savedSkillsData) {
      try {
        setSavedSkills(JSON.parse(savedSkillsData));
      } catch (error) {
        console.error("Error loading skills:", error);
      }
    }

    if (savedInterestsData) {
      try {
        setSavedInterests(JSON.parse(savedInterestsData));
      } catch (error) {
        console.error("Error loading interests:", error);
      }
    }

    setLoading(false);
  }, []);

  const getTopCareerDomains = () => {
    return recommendations?.careerDomains?.slice(0, 3) || [];
  };

  const getTopCareerRoles = () => {
    const roles = recommendations?.careerRoles || [];
    return roles.slice(0, 3).map(r => 
      typeof r === "string" ? { role: r, domain: "", match: "" } : r
    );
  };

  const getNextSteps = () => {
    const path = recommendations?.careerPath || {};
    const orderedPhases = ["shortTerm", "mediumTerm", "longTerm"];
    const steps = orderedPhases.flatMap((phase) => path[phase] || []);
    return steps.slice(0, 4);
  };

  const {
    careerDomains = [],
    careerRoles = [],
    careerPath = {},
    learningRoadmap = {},
  } = recommendations || {};

  const normalizedRoles = careerRoles.map((r) =>
    typeof r === "string"
      ? { role: r, domain: "", match: "" }
      : {
          role: r.role || r.name || "",
          domain: r.domain || "",
          match: r.match || r.reason || "",
        }
  );

  const downloadPdf = () => {
    downloadCareerPdf({
      careerDomains,
      normalizedRoles,
      careerPath,
      learningRoadmap,
      filename: "career-compass-roadmap.pdf",
    });
  };

  const copyToClipboard = async () => {
    const text = [
      "YOUR CAREER COMPASS",
      "",
      "Career Domains: " + careerDomains.join(", "),
      "",
      "Career Roles:",
      ...normalizedRoles.map((r) => `• ${r.role} (${r.domain}): ${r.match}`),
      "",
      "Learning Roadmap:",
      ...["beginner", "intermediate", "advanced"].flatMap((level) => [
        `\n${level.toUpperCase()}:`,
        ...(learningRoadmap[level] || []).map((s) => `  ✓ ${s}`),
      ]),
    ].join("\n");
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <Layout>
        <div className="max-w-6xl mx-auto text-center py-20">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/80">Loading your dashboard...</p>
        </div>
      </Layout>
    );
  }

  if (!recommendations) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto text-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/20 backdrop-blur-2xl p-12 rounded-3xl shadow-2xl border border-white/30"
          >
            <h1 className="text-4xl font-bold mb-6">Welcome to AI Career Compass 🎯</h1>
            <p className="text-lg mb-8 opacity-90">
              Get started by telling us about your skills and interests to receive personalized career recommendations.
            </p>
            <Link
              to="/skills"
              className="inline-block px-8 py-4 rounded-xl bg-white text-indigo-600 font-semibold shadow-xl hover:scale-105 transition"
            >
              Get Started →
            </Link>
          </motion.div>
        </div>
      </Layout>
    );
  }

  const topDomains = getTopCareerDomains();
  const topRoles = getTopCareerRoles();
  const nextSteps = getNextSteps();

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold mb-4">
            Your Career Dashboard 🚀
          </h1>
          <p className="text-lg opacity-80">
            Track your progress and explore your personalized career path.
          </p>
        </motion.div>

        {/* Export actions (same as Results screen) */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={downloadPdf}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/30 backdrop-blur-sm transition text-sm md:text-base"
          >
            <span>📥</span> Download PDF
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/30 backdrop-blur-sm transition text-sm md:text-base"
          >
            <span>{copied ? "✓" : "📋"}</span>{" "}
            {copied ? "Copied!" : "Copy Career Summary"}
          </motion.button>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          
          {/* Skills & Interests Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/20 backdrop-blur-2xl p-6 rounded-3xl shadow-2xl border border-white/30 h-full">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="text-2xl">🎨</span> Your Profile
              </h2>
              
              <div className="mb-4">
                <h3 className="text-sm font-medium text-white/70 mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {savedSkills.slice(0, 4).map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-white/25 rounded-full text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                  {savedSkills.length > 4 && (
                    <span className="px-3 py-1 bg-white/15 rounded-full text-xs">
                      +{savedSkills.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-white/70 mb-2">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {savedInterests.slice(0, 4).map((interest) => (
                    <span
                      key={interest}
                      className="px-3 py-1 bg-white/25 rounded-full text-xs font-medium"
                    >
                      {interest}
                    </span>
                  ))}
                  {savedInterests.length > 4 && (
                    <span className="px-3 py-1 bg-white/15 rounded-full text-xs">
                      +{savedInterests.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              <Link
                to="/skills"
                className="mt-4 block w-full text-center px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 border border-white/30 transition text-sm"
              >
                Edit Profile
              </Link>
            </div>
          </motion.div>

          {/* Career Domains */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/20 backdrop-blur-2xl p-6 rounded-3xl shadow-2xl border border-white/30 h-full">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="text-2xl">🎯</span> Your Career Domains
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {topDomains.map((domain, i) => (
                  <motion.div
                    key={domain}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-br from-white/20 to-white/10 p-4 rounded-2xl border border-white/30 text-center"
                  >
                    <div className="text-2xl mb-2">
                      {i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉"}
                    </div>
                    <h3 className="font-semibold text-yellow-300 text-sm leading-tight break-words">{domain}</h3>
                  </motion.div>
                ))}
              </div>

              <Link
                to="/results"
                className="block w-full text-center px-6 py-3 rounded-xl bg-white text-indigo-600 font-semibold shadow-xl hover:scale-105 transition"
              >
                View Full Report 🚀
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Career Roles & Next Steps */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          
          {/* Top Career Roles */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white/20 backdrop-blur-2xl p-6 rounded-3xl shadow-2xl border border-white/30 h-full">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="text-2xl">💼</span> Top Career Roles
              </h2>
              
              <div className="space-y-3">
                {topRoles.map((role, i) => (
                  <motion.div
                    key={role.role}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition"
                  >
                    <div className="space-y-2">
                      <div>
                        <h3 className="font-semibold text-sm">{role.role}</h3>
                        <p className="text-xs text-white/70">{role.domain}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-white/60">Match</div>
                        <p className="text-sm font-medium text-green-300">
                          {role.match || "Great fit"}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-white/20 backdrop-blur-2xl p-6 rounded-3xl shadow-2xl border border-white/30 h-full">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="text-2xl">🧭</span> Your Next Steps
              </h2>
              
              {nextSteps.length > 0 ? (
                <div className="space-y-3">
                  {nextSteps.map((step, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 px-5 py-3.5 bg-white/10 rounded-2xl"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/25 border border-white/50 flex items-center justify-center text-xs font-semibold text-white/90">
                        {index + 1}
                      </div>
                      <p className="text-xs leading-snug md:text-sm md:leading-snug">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-white/70">
                  Once you generate a career path, your top recommended actions
                  will appear here.
                </p>
              )}
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6">⚡ Quick Actions</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/20 backdrop-blur-xl p-4 rounded-2xl border border-white/30 cursor-pointer"
            >
              <Link to="/skills" className="block">
                <div className="text-2xl mb-2">🎨</div>
                <h3 className="font-semibold text-sm mb-1">Update Skills</h3>
                <p className="text-xs opacity-80">Edit your profile</p>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/20 backdrop-blur-xl p-4 rounded-2xl border border-white/30 cursor-pointer"
            >
              <Link to="/results">
                <div className="text-2xl mb-2">📊</div>
                <h3 className="font-semibold text-sm mb-1">View Report</h3>
                <p className="text-xs opacity-80">Full analysis</p>
              </Link>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </Layout>
  );
}

export default Dashboard;