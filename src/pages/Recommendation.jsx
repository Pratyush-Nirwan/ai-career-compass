import Layout from "../components/Layout";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

function Recommendation() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get career from navigation state
  const career = location.state?.career;

  // Redirect if user refreshes page without state
  if (!career) {
    navigate("/");
  }

  const descriptions = {
    "Web Development":
      "You enjoy creativity, interactive design, and building real-world applications. You thrive when turning ideas into digital experiences.",
    "Data Science":
      "You love analyzing data, spotting trends, and extracting meaningful insights. Numbers and patterns excite you.",
    "AI / ML":
      "You are fascinated by intelligent systems and algorithms. You enjoy solving complex problems with smart models.",
    "Cybersecurity":
      "You have a strong analytical mindset and care about protecting systems. Security and risk prevention align with your strengths.",
  };

  const strengths = {
    "Web Development": ["Creativity", "UI/UX Thinking", "Problem Solving"],
    "Data Science": ["Analytical Thinking", "Statistics", "Pattern Recognition"],
    "AI / ML": ["Logic", "Math", "Model Building"],
    "Cybersecurity": ["Attention to Detail", "Risk Analysis", "System Protection"],
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto text-center relative">
        {/* Animated Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold mb-8"
        >
          🎯 Your Ideal Career Path
        </motion.h1>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/20 backdrop-blur-2xl p-12 rounded-3xl shadow-2xl border border-white/30"
        >
          {/* Career Title */}
          <h2 className="text-4xl font-bold text-yellow-300 mb-6">
            {career}
          </h2>

          {/* Description */}
          <p className="text-lg mb-10 opacity-90">
            {descriptions[career]}
          </p>

          {/* Strength Tags */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {strengths[career].map((skill) => (
              <motion.span
                whileHover={{ scale: 1.1 }}
                key={skill}
                className="px-4 py-2 bg-white/30 rounded-full text-sm font-medium backdrop-blur-md"
              >
                {skill}
              </motion.span>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-6">

            <Link
              to="/questionnaire"
              className="px-6 py-3 rounded-full bg-white/20 hover:bg-white/30 transition"
            >
              Retake Test
            </Link>

            <Link
              to="/roadmap"
              state={{ career }}
              className="px-8 py-3 rounded-full bg-white text-indigo-600 font-semibold shadow-xl hover:scale-105 transition"
            >
              View Roadmap 🚀
            </Link>

          </div>
        </motion.div>

      </div>
    </Layout>
  );
}

export default Recommendation;