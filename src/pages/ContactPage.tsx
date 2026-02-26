import { personalInfo } from "@/data/portfolioData";

export default function ContactPage() {
  return (
    <div className="page">
      <h2 className="section-title">Contact</h2>
      <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 32 }}>
        Feel free to reach out.
      </p>

      <a href={`mailto:${personalInfo.email}`} className="contact-link">
        <span className="label">Email</span>
        {personalInfo.email}
      </a>
      <a
        href={personalInfo.socials.github}
        target="_blank"
        rel="noopener noreferrer"
        className="contact-link"
      >
        <span className="label">GitHub</span>
        {personalInfo.socials.github.replace("https://", "")}
      </a>
      <a
        href={personalInfo.socials.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="contact-link"
      >
        <span className="label">LinkedIn</span>
        {personalInfo.socials.linkedin.replace("https://", "")}
      </a>
    </div>
  );
}
