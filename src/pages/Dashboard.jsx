import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function Dashboard() {
  // Simulated stored data (later we connect this to Context or localStorage)
  const [career, setCareer] = useState("Web Development");
  const [progress, setProgress] = useState(45);

  useEffect(() => {
    // You can later replace this with localStorage or global state
    const savedCareer = localStorage.getItem("career");
    const savedProgress = localStorage.getItem("progress");

    if (savedCareer) setCareer(savedCareer);
    if (savedProgress) setProgress(Number(savedProgress));
  }, []);

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
            Welcome Back 👋
          </h1>
          <p className="text-lg opacity-80">
            Track your journey and continue building your future.
          </p>
        </motion.div>

        {/* Grid Layout */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Career Summary Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/20 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl border border-white/30"
          >
            <h2 className="text-2xl font-semibold mb-4">
              🎯 Your Career Path
            </h2>

            <p className="text-3xl font-bold text-yellow-300 mb-6">
              {career}
            </p>

            <Link
              to="/roadmap"
              state={{ career }}
              className="bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold shadow-xl hover:scale-105 transition"
            >
              Continue Roadmap 🚀
            </Link>
          </motion.div>

          {/* Progress Overview */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/20 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl border border-white/30"
          >
            <h2 className="text-2xl font-semibold mb-6">
              📊 Overall Progress
            </h2>

            <div className="flex justify-between text-sm mb-2">
              <span>Completion</span>
              <span>{progress}%</span>
            </div>

            <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden mb-6">
              <motion.div
                className="bg-gradient-to-r from-green-400 to-emerald-500 h-4 rounded-full"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>

            <p className="opacity-80">
              Keep going! You're making great progress 🚀
            </p>
          </motion.div>

        </div>

        {/* Quick Actions Section */}
        <div className="mt-14">
          <h2 className="text-3xl font-bold mb-6">
            ⚡ Quick Actions
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/20 backdrop-blur-xl p-6 rounded-2xl border border-white/30 cursor-pointer"
            >
              <Link to="/questionnaire">
                <h3 className="font-semibold text-lg mb-2">
                  Retake Assessment
                </h3>
                <p className="text-sm opacity-80">
                  Update your preferences and explore new paths.
                </p>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/20 backdrop-blur-xl p-6 rounded-2xl border border-white/30 cursor-pointer"
            >
              <Link to="/recommendation" state={{ career }}>
                <h3 className="font-semibold text-lg mb-2">
                  View Recommendation
                </h3>
                <p className="text-sm opacity-80">
                  Review your AI-generated career suggestion.
                </p>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/20 backdrop-blur-xl p-6 rounded-2xl border border-white/30 cursor-pointer"
            >
              <Link to="/roadmap" state={{ career }}>
                <h3 className="font-semibold text-lg mb-2">
                  Resume Roadmap
                </h3>
                <p className="text-sm opacity-80">
                  Continue completing your learning milestones.
                </p>
              </Link>
            </motion.div>

          </div>
        </div>

      </div>
    </Layout>
  );
}

export default Dashboard;