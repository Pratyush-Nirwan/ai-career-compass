import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { searchSkillsAndInterests } from "../data/skillsAndInterests";

function AutocompleteInput({ label, selectedItems, onAdd, onRemove, placeholder }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (query.trim().length >= 2) {
      const matches = searchSkillsAndInterests(query, selectedItems, 8);
      setSuggestions(matches);
      setHighlightedIndex(-1);
    } else {
      setSuggestions([]);
      setHighlightedIndex(-1);
    }
  }, [query, selectedItems]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (item) => {
    onAdd(item.value);
    setQuery("");
    setSuggestions([]);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((i) => (i < suggestions.length - 1 ? i + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((i) => (i > 0 ? i - 1 : suggestions.length - 1));
    } else if (e.key === "Enter" && highlightedIndex >= 0 && suggestions[highlightedIndex]) {
      e.preventDefault();
      handleSelect(suggestions[highlightedIndex]);
    } else if (e.key === "Escape") {
      setSuggestions([]);
      setHighlightedIndex(-1);
    }
  };

  const showSuggestions = isFocused && suggestions.length > 0;

  return (
    <div ref={containerRef} className="w-full relative">
      <label className="block text-sm font-medium mb-2 opacity-90">{label}</label>

      <div className="flex flex-wrap gap-2 p-3 bg-white/10 rounded-xl border border-white/30 min-h-[52px] focus-within:ring-2 focus-within:ring-white/50 focus-within:border-white/50 transition-all">
        {selectedItems.map((item) => (
          <motion.span
            key={item}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-white/25 rounded-full text-sm font-medium"
          >
            {item}
            <button
              type="button"
              onClick={() => onRemove(item)}
              className="ml-1 hover:bg-white/30 rounded-full p-0.5 transition"
              aria-label={`Remove ${item}`}
            >
              ×
            </button>
          </motion.span>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 min-w-[140px] bg-transparent border-none outline-none text-white placeholder-white/60"
        />
      </div>

      <AnimatePresence>
        {showSuggestions && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute z-20 mt-2 w-full max-w-md bg-white/95 backdrop-blur-xl rounded-xl shadow-xl border border-white/30 overflow-hidden"
          >
            {suggestions.map((item, i) => (
              <li key={item.value}>
                <button
                  type="button"
                  onClick={() => handleSelect(item)}
                  className={`w-full text-left px-4 py-3 flex justify-between items-center transition ${
                    i === highlightedIndex
                      ? "bg-indigo-100 text-indigo-900"
                      : "hover:bg-white/80 text-gray-800"
                  }`}
                >
                  <span>{item.value}</span>
                  <span className="text-xs opacity-70">{item.category}</span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AutocompleteInput;
