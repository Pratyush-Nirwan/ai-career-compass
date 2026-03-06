import jsPDF from "jspdf";

export const downloadCareerPdf = ({
  careerDomains = [],
  normalizedRoles = [],
  careerPath = {},
  learningRoadmap = {},
  filename = "career-compass-roadmap.pdf",
} = {}) => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: "a4",
  });

  const margin = 40;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const maxWidth = pageWidth - margin * 2;
  const lineHeight = 18;
  let y = margin;

  const ensureSpace = () => {
    if (y > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
  };

  const addTextBlock = (text, { size = 12, bold = false } = {}) => {
    if (!text) return;
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(size);

    const lines = doc.splitTextToSize(text, maxWidth);
    lines.forEach((line) => {
      ensureSpace();
      doc.text(line, margin, y);
      y += lineHeight;
    });
    y += 4;
  };

  addTextBlock("Your Career Compass", { size: 20, bold: true });
  y += 8;

  if (careerDomains.length) {
    addTextBlock("Recommended Career Domains", { size: 14, bold: true });
    careerDomains.forEach((domain) => {
      addTextBlock(`• ${domain}`);
    });
    y += 6;
  }

  if (normalizedRoles.length) {
    addTextBlock("Possible Career Roles", { size: 14, bold: true });
    normalizedRoles.forEach((r) => {
      const line = `• ${r.role || ""}${r.domain ? ` (${r.domain})` : ""}${
        r.match ? ` – ${r.match}` : ""
      }`;
      addTextBlock(line);
    });
    y += 6;
  }

  const phases = ["shortTerm", "mediumTerm", "longTerm"];
  const phaseLabels = {
    shortTerm: "Short Term",
    mediumTerm: "Medium Term",
    longTerm: "Long Term",
  };

  const hasPath = phases.some((p) => (careerPath[p] || []).length);
  if (hasPath) {
    addTextBlock("Structured Career Path", { size: 14, bold: true });
    phases.forEach((phase) => {
      const steps = careerPath[phase] || [];
      if (!steps.length) return;
      addTextBlock(phaseLabels[phase] || phase, { bold: true });
      steps.forEach((step, index) => {
        addTextBlock(`${index + 1}. ${step}`);
      });
      y += 4;
    });
  }

  const levels = ["beginner", "intermediate", "advanced"];
  const levelLabels = {
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
  };
  const hasRoadmap = levels.some((l) => (learningRoadmap[l] || []).length);

  if (hasRoadmap) {
    addTextBlock("Learning Roadmap", { size: 14, bold: true });
    levels.forEach((level) => {
      const items = learningRoadmap[level] || [];
      if (!items.length) return;
      addTextBlock(levelLabels[level] || level, { bold: true });
      items.forEach((item) => {
        addTextBlock(`• ${item}`);
      });
      y += 4;
    });
  }

  doc.save(filename);
};

