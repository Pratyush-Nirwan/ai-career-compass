import Layout from "../components/Layout";
import { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AutocompleteInput from "../components/AutocompleteInput";

const API_BASE = import.meta.env.VITE_API_URL || "";

function SkillsInput() {
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isSubmitting = useRef(false);
  const submitTimeout = useRef(null);

  const addSkill = (item) => {
    if (!skills.includes(item)) setSkills([...skills, item]);
  };

  const removeSkill = (item) => {
    setSkills(skills.filter((s) => s !== item));
  };

  const addInterest = (item) => {
    if (!interests.includes(item)) setInterests([...interests, item]);
  };

  const removeInterest = (item) => {
    setInterests(interests.filter((i) => i !== item));
  };

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (isSubmitting.current || loading) {
      return;
    }
    
    if (skills.length === 0 && interests.length === 0) {
      setError("Please add at least one skill or interest.");
      return;
    }
    
    // Clear any existing timeout
    if (submitTimeout.current) {
      clearTimeout(submitTimeout.current);
    }
    
    // Set debouncing flag
    isSubmitting.current = true;
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/recommend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills, interests }),
        signal: AbortSignal.timeout(30000), // 30 second timeout
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        // Handle 429 specifically
        if (res.status === 429) {
          throw new Error("Too many requests. Please wait a moment and try again.");
        }
        
        // Server may return 502 with fallback data when Gemini fails (quota, etc.)
        const hasFallbackData = data.careerDomains || data.careerRoles || data.learningRoadmap;
        if (hasFallbackData) {
          const fallbackData = { ...data, fallback: data };
          navigate("/results", { state: { recommendations: fallbackData } });
          
          // Save fallback data to localStorage for dashboard
          localStorage.setItem("careerRecommendations", JSON.stringify(fallbackData));
          localStorage.setItem("savedSkills", JSON.stringify(skills));
          localStorage.setItem("savedInterests", JSON.stringify(interests));
          return;
        }
        throw new Error(data.error || `Server error: ${res.status}`);
      }

      navigate("/results", { state: { recommendations: data } });
      
      // Save data to localStorage for dashboard
      localStorage.setItem("careerRecommendations", JSON.stringify(data));
      localStorage.setItem("savedSkills", JSON.stringify(skills));
      localStorage.setItem("savedInterests", JSON.stringify(interests));
    } catch (err) {
      if (err.name === 'AbortError') {
        setError("Request timed out. Please try again.");
      } else {
        setError(err.message || "Failed to get recommendations. Please try again.");
      }
    } finally {
      setLoading(false);
      // Reset submitting flag after a delay to prevent rapid resubmissions
      submitTimeout.current = setTimeout(() => {
        isSubmitting.current = false;
      }, 1000);
    }
  }, [skills, interests, loading, navigate, API_BASE]);

  return (
    <Layout>
      <div className="max-w-2xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/20 backdrop-blur-2xl p-10 rounded-3xl shadow-2xl border border-white/30"
        >
          <h1 className="text-3xl font-bold mb-2">Your Skills & Interests</h1>
          <p className="text-white/90 mb-8">
            Type to search and add skills or interests. We&apos;ll use these to recommend career paths and learning roadmaps.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="relative">
              <AutocompleteInput
                label="Skills"
                selectedItems={skills}
                onAdd={addSkill}
                onRemove={removeSkill}
                placeholder="e.g. Python, React, Data Analysis..."
              />
            </div>

            <div className="relative">
              <AutocompleteInput
                label="Interests"
                selectedItems={interests}
                onAdd={addInterest}
                onRemove={removeInterest}
                placeholder="e.g. Machine Learning, UX Design..."
              />
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-200 text-sm"
              >
                {error}
              </motion.p>
            )}

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full py-4 rounded-xl bg-white text-indigo-600 font-semibold shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                  Generating recommendations...
                </span>
              ) : (
                "Get Career Recommendations"
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </Layout>
  );
}

export default SkillsInput;
