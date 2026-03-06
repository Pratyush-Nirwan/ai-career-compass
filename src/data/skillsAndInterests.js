/**
 * Extensive dataset of skills and interests for autocomplete.
 * Organized by category for scalability and easy extension.
 */

export const skillsAndInterestsByCategory = {
  Technology: [
    "JavaScript", "TypeScript", "Python", "Java", "C++", "C#", "Ruby", "Go", "Rust", "Kotlin", "Swift",
    "React", "Vue.js", "Angular", "Node.js", "Next.js", "Django", "Flask", "Express.js", "Spring Boot",
    "HTML", "CSS", "Tailwind CSS", "SASS", "REST APIs", "GraphQL", "WebSockets",
    "Git", "GitHub", "Docker", "Kubernetes", "AWS", "Azure", "GCP", "CI/CD", "Linux",
    "SQL", "MongoDB", "PostgreSQL", "Redis", "Elasticsearch",
    "Microservices", "System Design", "Agile", "Scrum", "DevOps",
  ],
  Design: [
    "UI Design", "UX Design", "User Research", "Wireframing", "Prototyping", "Figma", "Sketch", "Adobe XD",
    "Visual Design", "Typography", "Color Theory", "Design Systems", "Responsive Design",
    "Interaction Design", "Information Architecture", "Usability Testing", "Accessibility",
    "Product Design", "Service Design", "Design Thinking", "Human-Centered Design",
  ],
  Business: [
    "Business Strategy", "Business Analysis", "Project Management", "Operations Management",
    "Stakeholder Management", "Risk Management", "Change Management", "Process Improvement",
    "Business Development", "Consulting", "Entrepreneurship", "Startup Management",
    "Budgeting", "Strategic Planning", "Market Analysis", "Competitive Analysis",
  ],
  Marketing: [
    "Digital Marketing", "Content Marketing", "SEO", "SEM", "Social Media Marketing", "Email Marketing",
    "Brand Strategy", "Copywriting", "Marketing Analytics", "Campaign Management",
    "Influencer Marketing", "Growth Hacking", "Conversion Optimization", "Market Research",
  ],
  Finance: [
    "Financial Analysis", "Financial Modeling", "Investment Analysis", "Portfolio Management",
    "Accounting", "Budgeting", "Risk Assessment", "Valuation", "M&A",
    "Excel", "Bloomberg Terminal", "Trading", "Corporate Finance", "Fintech",
  ],
  Science: [
    "Biology", "Chemistry", "Physics", "Mathematics", "Statistics", "Research",
    "Laboratory Work", "Scientific Writing", "Data Analysis", "Experimentation",
    "Molecular Biology", "Biochemistry", "Neuroscience", "Environmental Science",
  ],
  Healthcare: [
    "Patient Care", "Clinical Skills", "Medical Terminology", "Healthcare Administration",
    "Nursing", "Pharmacy", "Public Health", "Health Informatics", "Medical Research",
  ],
  "Creative Arts": [
    "Graphic Design", "Illustration", "Animation", "Video Editing", "Photography",
    "Music Production", "Creative Writing", "Storytelling", "3D Modeling",
    "Adobe Creative Suite", "Blender", "After Effects", "Premiere Pro",
  ],
  Engineering: [
    "Mechanical Engineering", "Electrical Engineering", "Civil Engineering", "Chemical Engineering",
    "CAD", "SolidWorks", "AutoCAD", "MATLAB", "Simulation", "Control Systems",
    "Embedded Systems", "Robotics", "IoT", "Manufacturing",
  ],
  "Data and AI": [
    "Machine Learning", "Deep Learning", "Natural Language Processing", "Computer Vision",
    "Data Science", "Data Engineering", "Data Analytics", "TensorFlow", "PyTorch",
    "Pandas", "NumPy", "Scikit-learn", "Data Visualization", "Big Data", "Spark",
    "LLMs", "Generative AI", "Reinforcement Learning", "MLOps", "A/B Testing",
  ],
  Sales: [
    "B2B Sales", "B2C Sales", "Sales Strategy", "Negotiation", "Customer Relationship Management",
    "Lead Generation", "Sales Analytics", "Account Management", "Enterprise Sales",
  ],
  Writing: [
    "Technical Writing", "Content Writing", "Copywriting", "Documentation", "Grant Writing",
    "Editing", "Proofreading", "Creative Writing", "Blogging",
  ],
  Education: [
    "Teaching", "Curriculum Development", "Instructional Design", "E-Learning",
    "Training", "Mentoring", "Public Speaking", "Presentation Skills",
  ],
  Legal: [
    "Legal Research", "Contract Law", "Corporate Law", "Intellectual Property",
    "Compliance", "Regulatory Affairs", "Litigation", "Legal Writing",
  ],
  HR: [
    "Recruiting", "Talent Acquisition", "Employee Relations", "Performance Management",
    "Compensation", "Benefits", "HR Analytics", "Organizational Development",
  ],
  "Artificial Intelligence & Machine Learning": [
    "Artificial Intelligence & Machine Learning", "Machine Learning Algorithms", "Deep Learning", "Data Preprocessing", "Model Evaluation",
    "TensorFlow", "PyTorch", "Scikit-learn", "Keras", "Jupyter Notebook",
  ],
  "Data Science & Analytics": [
    "Data Science & Analytics", "Data Analysis", "Statistical Modeling", "Data Visualization", "Data Cleaning",
    "R", "Pandas", "Tableau", "Power BI",
  ],
  "Software Development": [
    "Software Development", "Object-Oriented Programming", "APIs", "System Design", "Debugging",
    "Visual Studio Code", "IntelliJ IDEA", "Postman",
  ],
  "Cyber Security": [
    "Cyber Security", "Network Security", "Ethical Hacking", "Cryptography", "Incident Response",
    "Kali Linux", "Wireshark", "Metasploit", "Burp Suite", "Nmap",
  ],
  "Cloud Computing & DevOps": [
    "Cloud Computing & DevOps", "Cloud Architecture", "Containerization", "Infrastructure Automation", "Monitoring",
    "Jenkins",
  ],
  "Internet of Things (IoT)": [
    "Internet of Things (IoT)", "Sensor Integration", "Embedded Programming", "Networking Protocols", "Data Collection", "Edge Computing",
    "Arduino", "Raspberry Pi", "MQTT", "Node-RED", "ThingSpeak",
  ],
  "Robotics Engineering": [
    "Robotics Engineering", "Robot Kinematics", "Sensor Fusion", "Path Planning",
    "ROS", "Gazebo",
  ],
  "Embedded Systems Engineering": [
    "Embedded Systems Engineering", "Microcontroller Programming", "Real-Time Systems", "Hardware Interfacing", "Firmware Development",
    "Arduino IDE", "Keil", "STM32CubeIDE", "Proteus", "MPLAB",
  ],
  "Electrical & Power Engineering": [
    "Electrical & Power Engineering", "Power Systems", "Circuit Design", "Electrical Machines", "Power Electronics", "Grid Management",
    "PSCAD", "ETAP", "AutoCAD Electrical", "Multisim",
  ],
  "Mechanical Engineering Design": [
    "Mechanical Engineering Design", "Mechanical Design", "Thermodynamics", "Material Science", "CAD Modeling", "Manufacturing Processes",
    "CATIA", "ANSYS", "Fusion 360",
  ],
  "Aerospace Engineering": [
    "Aerospace Engineering", "Aerodynamics", "Flight Mechanics", "Propulsion Systems", "Structural Analysis",
    "ANSYS Fluent", "XFOIL", "OpenFOAM",
  ],
  "Civil & Structural Engineering": [
    "Civil & Structural Engineering", "Structural Analysis", "Construction Management", "Geotechnical Engineering", "Surveying", "Project Planning",
    "STAAD Pro", "ETABS", "Revit", "SAP2000",
  ],
  "Environmental Engineering": [
    "Environmental Engineering", "Pollution Control", "Waste Management", "Water Treatment", "Environmental Impact Analysis", "Sustainability Planning",
    "ArcGIS", "EPA SWMM", "QGIS",
  ],
  "Biomedical Engineering": [
    "Biomedical Engineering", "Medical Device Design", "Biomaterials", "Signal Processing", "Biomechanics", "Medical Imaging",
    "LabVIEW", "ImageJ", "COMSOL",
  ],
  "Automotive Engineering": [
    "Automotive Engineering", "Vehicle Dynamics", "Engine Design", "Automotive Electronics", "EV Technology",
    "Simulink", "AVL Cruise",
  ],
  "Chemical & Process Engineering": [
    "Chemical & Process Engineering", "Chemical Process Design", "Reaction Engineering", "Process Optimization", "Safety Management",
    "Aspen Plus", "AutoCAD Plant 3D", "HYSYS",
  ],
  "Industrial & Manufacturing Engineering": [
    "Industrial & Manufacturing Engineering", "Production Planning", "Quality Control", "Supply Chain Management", "Lean Manufacturing",
    "Minitab", "SAP ERP", "Arena Simulation",
  ],
  "Telecommunications Engineering": [
    "Telecommunications Engineering", "Wireless Communication", "Signal Processing", "Network Protocols", "RF Engineering", "Network Optimization",
    "NS-3", "Cisco Packet Tracer", "GNU Radio",
  ],
  "Blockchain & Web3 Engineering": [
    "Blockchain & Web3 Engineering", "Smart Contracts", "Decentralized Applications", "DApps", "Distributed Systems", "Token Economics",
    "Solidity", "Ethereum", "Hardhat", "Remix IDE", "Web3.js",
  ],
  "AR/VR & Metaverse Engineering": [
    "AR/VR & Metaverse Engineering", "3D Modeling", "Game Physics", "Immersive Interaction Design", "Spatial Computing", "Computer Graphics",
    "Unity", "Unreal Engine", "OpenXR", "Three.js",
  ],
  "Quantum Computing": [
    "Quantum Computing", "Quantum Algorithms", "Quantum Circuits", "Quantum Information Theory", "Mathematical Modeling",
    "Qiskit", "Cirq", "IBM Quantum Experience", "QuTiP",
  ],
  "Game Development": [
    "Game Development", "Game Design", "Physics Simulation", "Graphics Programming", "AI for Games", "Level Design",
    "Godot",
  ],
  "Human-Computer Interaction (HCI)": [
    "Human-Computer Interaction (HCI)", "UX Design", "User Research", "Interaction Design", "Usability Testing", "Accessibility Design",
    "InVision", "Balsamiq",
  ],
  "Bioinformatics Engineering": [
    "Bioinformatics Engineering", "Genomic Data Analysis", "Computational Biology", "Sequence Alignment", "Data Mining",
    "BLAST", "Bioconductor", "Galaxy",
  ],
  "Renewable Energy Engineering": [
    "Renewable Energy Engineering", "Solar Systems", "Wind Systems", "Energy Storage", "Grid Integration", "Energy Efficiency",
    "HOMER", "PVsyst", "RETScreen",
  ],
  "Geospatial & GIS Engineering": [
    "Geospatial & GIS Engineering", "Spatial Analysis", "Remote Sensing", "Map Visualization", "Geospatial Data Processing",
    "Google Earth Engine", "ERDAS Imagine",
  ],
  "Network Engineering": [
    "Network Engineering", "Network Design", "Routing & Switching", "Troubleshooting", "Protocol Configuration",
    "GNS3", "Nagios", "SolarWinds",
  ],
  "Digital Signal Processing": [
    "Digital Signal Processing", "Signal Analysis", "Filter Design", "Image Processing", "Audio Processing", "Fourier Transform", "System Modeling",
  ],
  "Agricultural Engineering": [
    "Agricultural Engineering", "Precision Farming", "Irrigation Systems", "Farm Machinery Design", "Soil Analysis", "Agricultural Automation",
    "Drone Mapping",
  ],
  "Marine & Ocean Engineering": [
    "Marine & Ocean Engineering", "Ocean Systems Design", "Hydrodynamics", "Marine Structures", "Navigation Systems", "Offshore Engineering",
    "OrcaFlex",
  ],
};

// Flatten into a single searchable list with category metadata
export const allSkillsAndInterests = Object.entries(skillsAndInterestsByCategory).flatMap(
  ([category, items]) => items.map((item) => ({ value: item, category }))
);

// Get unique values for fast lookup
export const skillInterestValues = allSkillsAndInterests.map((i) => i.value);

/**
 * Search for matching skills/interests (case-insensitive, partial match)
 * @param {string} query - User input
 * @param {string[]} excluded - Already selected items to exclude
 * @param {number} limit - Max suggestions to return
 */
export function searchSkillsAndInterests(query, excluded = [], limit = 10) {
  if (!query || query.trim().length < 2) return [];

  const q = query.trim().toLowerCase();
  const excludeSet = new Set(excluded.map((e) => e.toLowerCase()));

  const matches = allSkillsAndInterests
    .filter(({ value }) => {
      if (excludeSet.has(value.toLowerCase())) return false;
      return value.toLowerCase().includes(q);
    })
    .slice(0, limit);

  return matches;
}
