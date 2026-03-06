/**
 * Maps topics/skills to learning resource search URLs
 */
export const RESOURCE_PLATFORMS = {
  google: (query) =>
    `https://www.google.com/search?q=${encodeURIComponent(query + " tutorial course")}`,
  youtube: (query) =>
    `https://www.youtube.com/results?search_query=${encodeURIComponent(query + " tutorial")}`,
  coursera: (query) =>
    `https://www.coursera.org/search?query=${encodeURIComponent(query)}`,
  udemy: (query) =>
    `https://www.udemy.com/courses/search/?q=${encodeURIComponent(query)}`,
  freeCodeCamp: (query) =>
    `https://www.freecodecamp.org/search?query=${encodeURIComponent(query)}`,
  edx: (query) =>
    `https://www.edx.org/search?q=${encodeURIComponent(query)}`,
};

export function getLearningLinks(item) {
  return [
    { name: "Google", url: RESOURCE_PLATFORMS.google(item), icon: "🔍" },
    { name: "YouTube", url: RESOURCE_PLATFORMS.youtube(item), icon: "▶️" },
    { name: "Coursera", url: RESOURCE_PLATFORMS.coursera(item), icon: "📚" },
    { name: "freeCodeCamp", url: RESOURCE_PLATFORMS.freeCodeCamp(item), icon: "💻" },
  ];
}
