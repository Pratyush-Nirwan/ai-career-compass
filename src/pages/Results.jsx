import Layout from "../components/Layout";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { getLearningLinks } from "../utils/learningResources";
import { downloadCareerPdf } from "../utils/exportPdf";

function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedLinks, setExpandedLinks] = useState(null);
  const [copied, setCopied] = useState(false);
  const [completedSkills, setCompletedSkills] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("completedSkills") || "[]");
    } catch {
      return [];
    }
  });
  const stateData = location.state?.recommendations;
  const storedData = (() => {
    try {
      return JSON.parse(localStorage.getItem("careerRecommendations") || "null");
    } catch {
      return null;
    }
  })();
  const data = stateData || storedData;

  useEffect(() => {
    localStorage.setItem("completedSkills", JSON.stringify(completedSkills));
  }, [completedSkills]);

  useEffect(() => {
    if (stateData) {
      localStorage.setItem("careerRecommendations", JSON.stringify(stateData));
    }
  }, [stateData]);

  useEffect(() => {
    if (!data) navigate("/");
  }, [data, navigate]);

  if (!data) return null;

  const recommendations = data.fallback || data;
  const hasFallback = !!data.fallback;

  const {
    careerDomains = [],
    careerRoles = [],
    careerPath = {},
    learningRoadmap = {},
  } = recommendations;

  const normalizedRoles = careerRoles.map((r) =>
    typeof r === "string"
      ? { role: r, domain: "", match: "" }
      : {
          role: r.role || r.name || "",
          domain: r.domain || "",
          match: r.match || r.reason || "",
        }
  );

  const fadeIn = (delay = 0, y = 20) => ({
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay },
  });

  const stagger = (i, base = 0) => ({
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.35, delay: base + i * 0.05 },
  });

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

  const toggleLinks = (key) => {
    setExpandedLinks(expandedLinks === key ? null : key);
  };

  const toggleSkillCompletion = (item) => {
    setCompletedSkills((prev) =>
      prev.includes(item) ? prev.filter((s) => s !== item) : [...prev, item]
    );
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto relative pb-20">
        {hasFallback && (
          <motion.div
            {...fadeIn(0)}
            className="mb-6 p-4 bg-amber-500/30 rounded-2xl border border-amber-400/50 text-amber-100 backdrop-blur-sm"
          >
            AI recommendations are temporarily unavailable. Showing fallback suggestions based on your input.
          </motion.div>
        )}

        {/* Header */}
        <motion.div
          {...fadeIn(0)}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-amber-100 to-yellow-300 bg-clip-text text-transparent">
            Your Career Compass
          </h1>
          <p className="text-white/80 text-lg">
            Your personalized roadmap to success
          </p>
        </motion.div>

        {/* Export Bar */}
        <motion.div
          {...fadeIn(0.05)}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={downloadPdf}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/30 backdrop-blur-sm transition"
          >
            <span>📥</span> Download PDF
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/30 backdrop-blur-sm transition"
          >
            <span>{copied ? "✓" : "📋"}</span> {copied ? "Copied!" : "Copy to Clipboard"}
          </motion.button>
        </motion.div>

        {/* Career Domains */}
        <motion.section {...fadeIn(0.1)} className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-2xl">🎯</span> Recommended Career Domains
          </h2>
          <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20 shadow-xl">
            <div className="flex flex-wrap gap-3">
              {careerDomains.map((domain, i) => (
                <motion.span
                  key={domain}
                  {...stagger(i, 0.15)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-4 py-2.5 bg-gradient-to-r from-white/25 to-white/15 rounded-full font-medium border border-white/20 hover:border-white/40 transition cursor-default"
                >
                  {domain}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Career Roles */}
        <motion.section {...fadeIn(0.2)} className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-2xl">💼</span> Possible Career Roles
          </h2>
          <div className="space-y-3">
            {normalizedRoles.map((item, i) => (
              <motion.div
                key={item.role}
                {...stagger(i, 0.25)}
                whileHover={{ x: 4 }}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 p-4 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 hover:border-white/40 hover:bg-white/15 transition"
              >
                <div>
                  <h3 className="font-semibold text-lg">{item.role}</h3>
                  <p className="text-sm text-white/80">{item.domain}</p>
                </div>
                <span className="text-sm text-white/90 sm:text-right max-w-xs">
                  {item.match}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Career Path */}
        <motion.section {...fadeIn(0.3)} className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-2xl">🛤️</span> Structured Career Path
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {["shortTerm", "mediumTerm", "longTerm"].map((phase, idx) => (
              <motion.div
                key={phase}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + idx * 0.08 }}
                className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 hover:border-amber-400/40 transition"
              >
                <h3 className="font-semibold mb-4 capitalize text-amber-300 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-amber-400/30 flex items-center justify-center text-sm font-bold">
                    {idx + 1}
                  </span>
                  {phase.replace(/([A-Z])/g, " $1").trim()}
                </h3>
                <ul className="space-y-3">
                  {(careerPath[phase] || []).map((step, i) => (
                    <li key={i} className="flex gap-2 items-start">
                      <span className="text-amber-400 mt-0.5">→</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Learning Roadmap with course links */}
        <motion.section {...fadeIn(0.4)} className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-2xl">📚</span> Learning Roadmap
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {["beginner", "intermediate", "advanced"].map((level, idx) => (
              <motion.div
                key={level}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 + idx * 0.08 }}
                className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 hover:border-green-400/40 transition"
              >
                <h3 className="font-semibold mb-4 capitalize text-green-300 flex items-center gap-2">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      idx === 0
                        ? "bg-green-400"
                        : idx === 1
                        ? "bg-yellow-400"
                        : "bg-emerald-400"
                    }`}
                  />
                  {level}
                </h3>
                <ul className="space-y-3">
                  {(learningRoadmap[level] || []).map((item, i) => {
                    const key = `${level}-${i}`;
                    const links = getLearningLinks(item);
                    const isExpanded = expandedLinks === key;
                    const isCompleted = completedSkills.includes(item);
                    return (
                      <motion.li
                        key={key}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + idx * 0.1 + i * 0.05 }}
                        className="group"
                      >
                        <div className="flex items-start gap-2">
                          <button
                            type="button"
                            onClick={() => toggleSkillCompletion(item)}
                            className={`mt-0.5 text-sm transition ${
                              isCompleted
                                ? "text-green-300"
                                : "text-white/60 group-hover:text-green-200"
                            }`}
                            aria-label={
                              isCompleted
                                ? "Mark skill as incomplete"
                                : "Mark skill as completed"
                            }
                          >
                            {isCompleted ? "✔" : "○"}
                          </button>
                          <div className="flex-1 min-w-0">
                            <span
                              className={
                                isCompleted
                                  ? "line-through text-white/70"
                                  : undefined
                              }
                            >
                              {item}
                            </span>
                            <button
                              onClick={() => toggleLinks(key)}
                              className="ml-2 text-xs text-white/70 hover:text-amber-300 transition"
                            >
                              {isExpanded ? "▼ hide links" : "► find courses"}
                            </button>
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="mt-2 flex flex-wrap gap-1 overflow-hidden"
                                >
                                  {links.map(({ name, url, icon }) => (
                                    <a
                                      key={name}
                                      href={url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white/15 hover:bg-white/25 text-xs border border-white/20"
                                    >
                                      {icon} {name}
                                    </a>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </motion.li>
                    );
                  })}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Actions */}
        <motion.div
          {...fadeIn(0.55)}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link
            to="/skills"
            className="px-6 py-3 rounded-xl bg-white/15 hover:bg-white/25 border border-white/30 transition"
          >
            Edit Skills & Interests
          </Link>
          <Link
            to="/"
            className="px-8 py-3 rounded-xl bg-white text-indigo-600 font-semibold shadow-xl hover:scale-105 hover:shadow-2xl transition"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    </Layout>
  );
}

export default Results;
