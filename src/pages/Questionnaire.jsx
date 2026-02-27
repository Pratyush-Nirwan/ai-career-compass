import Layout from "../components/Layout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Questionnaire() {
  const navigate = useNavigate();

  const questions = [
    {
      question: "Which field excites you the most?",
      options: ["Web Development", "Data Science", "AI / ML", "Cybersecurity"],
    },
    {
      question: "What kind of problems do you enjoy solving?",
      options: ["Building UI", "Analyzing patterns", "Training models", "Protecting systems"],
    },
    {
      question: "Which environment do you prefer?",
      options: ["Creative & Visual", "Data-Driven", "Research-Focused", "Security-Oriented"],
    },
    {
      question: "Your strongest skill?",
      options: ["Design", "Math", "Logic", "Attention to detail"],
    },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);

  const totalSteps = questions.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  // 🎯 Dynamic Recommendation Logic
  const calculateRecommendation = () => {
    const scores = {
      "Web Development": 0,
      "Data Science": 0,
      "AI / ML": 0,
      "Cybersecurity": 0,
    };

    answers.forEach((answer) => {
      if (!answer) return;

      if (
        ["Web Development", "Building UI", "Creative & Visual", "Design"].includes(answer)
      )
        scores["Web Development"]++;

      if (
        ["Data Science", "Analyzing patterns", "Data-Driven", "Math"].includes(answer)
      )
        scores["Data Science"]++;

      if (
        ["AI / ML", "Training models", "Research-Focused", "Logic"].includes(answer)
      )
        scores["AI / ML"]++;

      if (
        ["Cybersecurity", "Protecting systems", "Security-Oriented", "Attention to detail"].includes(answer)
      )
        scores["Cybersecurity"]++;
    });

    const bestCareer = Object.keys(scores).reduce((a, b) =>
      scores[a] > scores[b] ? a : b
    );

    return bestCareer;
  };

  const handleOptionClick = (option) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = option;
    setAnswers(newAnswers);
  };

  const nextStep = () => {
    if (!answers[currentStep]) return;

    if (currentStep === totalSteps - 1) {
      setLoading(true);

      const result = calculateRecommendation();

      setTimeout(() => {
        navigate("/recommendation", { state: { career: result } });
      }, 2000);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  return (
    <Layout>
      <div className="relative max-w-3xl mx-auto">

        {/* Animated Background Blobs */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-pink-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-indigo-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>

        {loading ? (
          <div className="text-center py-32">
            <motion.div
              className="text-3xl font-bold"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              🤖 Analyzing Your Profile...
            </motion.div>
          </div>
        ) : (
          <>
            {/* Progress Bar */}
            <div className="mb-10">
              <div className="flex justify-between text-sm mb-2">
                <span>
                  Step {currentStep + 1} of {totalSteps}
                </span>
                <span>{Math.round(progress)}%</span>
              </div>

              <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-yellow-300 to-orange-400 h-4 rounded-full shadow-lg"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.6 }}
                />
              </div>
            </div>

            {/* Question Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="bg-white/20 backdrop-blur-2xl p-10 rounded-3xl shadow-2xl border border-white/30"
              >
                <h2 className="text-3xl font-bold mb-8">
                  {questions[currentStep].question}
                </h2>

                <div className="space-y-4">
                  {questions[currentStep].options.map((option) => (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      key={option}
                      onClick={() => handleOptionClick(option)}
                      className={`w-full py-4 rounded-xl transition-all duration-300 border ${
                        answers[currentStep] === option
                          ? "bg-yellow-300 text-black shadow-xl"
                          : "bg-white/10 hover:bg-white/30"
                      }`}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>

                <div className="flex justify-between mt-10">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="px-6 py-2 rounded-full bg-white/20 hover:bg-white/30 disabled:opacity-40 transition"
                  >
                    Back
                  </button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={nextStep}
                    className="px-8 py-3 rounded-full bg-white text-indigo-600 font-semibold shadow-xl"
                  >
                    {currentStep === totalSteps - 1 ? "Finish 🚀" : "Next"}
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </div>
    </Layout>
  );
}

export default Questionnaire;