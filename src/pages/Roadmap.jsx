import Layout from "../components/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

function Roadmap() {
  const location = useLocation();
  const navigate = useNavigate();

  const career = location.state?.career;

  // If user refreshes and state is lost → redirect home
  if (!career) {
    navigate("/");
  }

  const roadmaps = {
    "Web Development": [
      "Learn HTML, CSS, JavaScript",
      "Master React & Frontend Frameworks",
      "Learn Backend (Node.js / FastAPI)",
      "Work with Databases (MongoDB / MySQL)",
      "Build Full Stack Projects",
      "Deploy Applications (Vercel / AWS)",
    ],
    "Data Science": [
      "Learn Python",
      "Statistics & Probability",
      "Pandas, NumPy & Data Cleaning",
      "Machine Learning Algorithms",
      "Data Visualization",
      "Build Real Data Projects",
    ],
    "AI / ML": [
      "Python & Math Foundations",
      "Linear Algebra & Calculus",
      "Deep Learning Basics",
      "Neural Networks & CNNs",
      "NLP / Computer Vision",
      "Build AI Applications",
    ],
    "Cybersecurity": [
      "Networking Fundamentals",
      "Linux & System Basics",
      "Ethical Hacking Concepts",
      "Security Tools (Wireshark, Metasploit)",
      "Penetration Testing",
      "Practice on Real Labs (TryHackMe/HackTheBox)",
    ],
  };

  const steps = roadmaps[career] || [];

  const [completedSteps, setCompletedSteps] = useState([]);

  const toggleStep = (index) => {
    if (completedSteps.includes(index)) {
      setCompletedSteps(completedSteps.filter((i) => i !== index));
    } else {
      setCompletedSteps([...completedSteps, index]);
    }
  };

  const progress = Math.round(
    (completedSteps.length / steps.length) * 100
  );

  return (
    <Layout>
      <div className="max-w-4xl mx-auto relative">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-center mb-12"
        >
          {career} Roadmap 🚀
        </motion.h1>

        {/* Progress Tracker */}
        <div className="mb-12">
          <div className="flex justify-between text-sm mb-2">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>

          <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-green-400 to-emerald-500 h-4 rounded-full shadow-lg"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6 }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => toggleStep(index)}
              className={`cursor-pointer p-6 rounded-2xl backdrop-blur-xl border transition-all duration-300 ${
                completedSteps.includes(index)
                  ? "bg-green-400/30 border-green-300"
                  : "bg-white/20 border-white/30 hover:bg-white/30"
              }`}
            >
              <div className="flex justify-between items-center">
                <p className="font-semibold">
                  Step {index + 1}: {step}
                </p>

                {completedSteps.includes(index) && (
                  <span className="text-green-300 font-bold">✔</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Completion Message */}
        {progress === 100 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 text-center text-2xl font-bold text-green-300"
          >
            🎉 Congratulations! You completed this roadmap!
          </motion.div>
        )}
      </div>
    </Layout>
  );
}

export default Roadmap;