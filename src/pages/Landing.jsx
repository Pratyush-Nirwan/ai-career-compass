import Layout from "../components/Layout";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <Layout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center max-w-4xl mx-auto">

        <h2 className="text-6xl font-bold mb-6 leading-tight">
          Discover Your <span className="text-yellow-300">Perfect Career</span>
        </h2>

        <p className="text-lg opacity-90 mb-8">
          AI-powered career guidance platform that helps students
          choose the right roadmap based on skills, interests and goals.
        </p>

        <Link
          to="/skills"
          className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold shadow-xl hover:scale-105 transition duration-300"
        >
          Start Exploring 🚀
        </Link>

      </div>
    </Layout>
  );
}

export default Landing;