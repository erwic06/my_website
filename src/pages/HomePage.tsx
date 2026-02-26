import { personalInfo } from "@/data/portfolioData";

export default function HomePage() {
  return (
    <div className="page">
      <div className="intro">
        <p>{personalInfo.bio}</p>

        <div className="roles">
          {personalInfo.roles.map((role, i) => (
            <div key={i} className="role">
              {role.title} @ {role.org}
            </div>
          ))}
        </div>


      </div>
    </div>
  );
}
