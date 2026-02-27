import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Questionnaire from "./pages/Questionnaire";
import Recommendation from "./pages/Recommendation";
import Roadmap from "./pages/Roadmap";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/recommendation" element={<Recommendation />} />
        <Route path="/roadmap" element={<Roadmap />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;