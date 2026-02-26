import { useState, useEffect } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { personalInfo } from "@/data/portfolioData";
import HomePage from "@/pages/HomePage";
import ProjectsPage from "@/pages/ProjectsPage";
import BlogPage from "@/pages/BlogPage";
import BlogPostPage from "@/pages/BlogPostPage";
import InterestsPage from "@/pages/InterestsPage";
import InterestPage from "@/pages/InterestPage";
import ContactPage from "@/pages/ContactPage";

const LAST_UPDATED = "February 25, 2026";

function App() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((t) => (t === "dark" ? "light" : "dark"));

  const navItems = [
    { to: "/", label: "home" },
    { to: "/projects", label: "projects" },
    { to: "/interests", label: "interests" },
    { to: "/blog", label: "blog" },
    { to: "/contact", label: "contact me" },
  ];

  return (
    <>
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {theme === "dark" ? "☀" : "☾"}
      </button>

      <div className="container">
        <header className="site-header">
          <h1 className="site-name">{personalInfo.name}</h1>
          <div className="social-links">
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              github
            </a>
            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedIn
            </a>
          </div>
        </header>

        <nav>
          <div className="nav-links">
            {navItems.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {label}
              </NavLink>
            ))}
          </div>
          <hr className="nav-divider" />
        </nav>

        <div className="content-area">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogPostPage />} />
            <Route path="/interests" element={<InterestsPage />} />
            <Route path="/interests/:id" element={<InterestPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
          <div className="last-updated">Last updated {LAST_UPDATED}</div>
        </div>
      </div>
    </>
  );
}

export default App;
