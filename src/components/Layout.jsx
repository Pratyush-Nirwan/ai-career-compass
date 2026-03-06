import { Link } from "react-router-dom";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-red-900 text-white flex flex-col">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-5 backdrop-blur-md bg-white/10 border-b border-white/20">
        <h1 className="text-2xl font-bold tracking-wide">
          AI Career Compass
        </h1>

        <div className="space-x-6">
          <Link to="/" className="hover:text-gray-200 transition">
            Home
          </Link>
          <Link to="/skills" className="hover:text-gray-200 transition">
            Explore Careers
          </Link>
          <Link to="/dashboard" className="hover:text-gray-200 transition">
            Dashboard
          </Link>
        </div>
      </nav>

      {/* Page Content */}
      <main className="flex-grow px-10 py-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="text-center py-4 bg-white/10 backdrop-blur-md border-t border-white/20">
        <p className="text-sm opacity-80">
          © 2026 AI Career Compass • Built with ❤️
        </p>
      </footer>
    </div>
  );
}

export default Layout;