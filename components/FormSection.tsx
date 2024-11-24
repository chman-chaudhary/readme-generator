import { useState } from "react";
import SkillInput from "./SkillInput";
import ProjectInput from "./ProjectInput";
import ExperienceInput from "./ExperienceInput";
import SocialLinksInput from "./SocialLinksInput";
import { Input } from "./ui/input";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Check, Code2, Copy, EyeIcon } from "lucide-react";
import { Button } from "./ui/button";

export default function MainForm() {
  const [skills, setSkills] = useState<string[]>([]);
  const [projects, setProjects] = useState<
    { title: string; description: string; link: string }[]
  >([]);
  const [experiences, setExperiences] = useState<
    { role: string; company: string; description: string }[]
  >([]);
  const [socialLinks, setSocialLinks] = useState({
    linkedin: "",
    twitter: "",
    instagram: "",
    portfolio: "",
    linkedIn: "",
    other: "",
  });
  const [tagline, setTagline] = useState("");
  const [location, setLocation] = useState("");
  const [previewMode, setPreviewMode] = useState<"raw" | "rendered">("raw");
  const [copied, setCopied] = useState(false);

  const generateReadme = () => {
    return `
${tagline}

${location ? "## Location" : ""}
${location}

${skills.length > 0 ? "## Skills" : ""}
${skills.map((skill) => `- ${skill}`).join("\n")}

${projects.length > 0 ? "## Projects" : ""}
${projects
  .map(
    (project) =>
      `- **${project.title}**: ${project.description} ([Link](${project.link}))`
  )
  .join("\n")}

${experiences.length > 0 ? "## Experience" : ""}
${experiences
  .map(
    (experience) =>
      `- **${experience.role}** at **${experience.company}**: ${experience.description}`
  )
  .join("\n")}

  ${
    Object.values(socialLinks).some((link) => link?.trim() !== "")
      ? "Social Links"
      : ""
  }
${Object.entries(socialLinks)
  .filter(([key, value]) => value.trim() !== "")
  .map(
    ([key, value]) =>
      `- **${
        key.charAt(0).toUpperCase() + key.slice(1)
      }**: [${value}](${value})`
  )
  .join("\n")}
    `;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generateReadme());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset the copied state after 2 seconds
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  return (
    <div className="flex w-full h-screen bg-gray-900 text-gray-200">
      {/* Form Section */}
      <div className="w-1/2 p-6 space-y-6 overflow-y-auto">
        <h1 className="text-3xl font-bold text-neon">
          GitHub Profile Generator
        </h1>
        <div>
          <label className="block text-sm font-medium text-gray-400">
            Tagline
          </label>
          <Input
            type="text"
            className="shadcn-input mt-1 w-full"
            placeholder="Enter your tagline"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400">
            Location
          </label>
          <Input
            type="text"
            className="shadcn-input mt-1 w-full"
            placeholder="Enter your location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <SkillInput
          addSkill={(skill) => setSkills((prev) => [...prev, skill])}
          skills={skills}
        />
        <ProjectInput
          addProject={(project) => setProjects((prev) => [...prev, project])}
          projects={projects}
        />
        <ExperienceInput
          addExperience={(experience) =>
            setExperiences((prev) => [...prev, experience])
          }
          experiences={experiences}
        />
        <SocialLinksInput
          socialLinks={socialLinks}
          setSocialLinks={setSocialLinks}
        />
      </div>

      {/* README Preview Section */}
      <div className="w-1/2 bg-gray-800 p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">README Preview</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={handleCopy}
              className="shadcn-button relative"
              title="Copy to Clipboard"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4 text-gray-300" />
              )}
            </button>
            <Button
              onClick={() =>
                setPreviewMode(previewMode === "raw" ? "rendered" : "raw")
              }
            >
              {previewMode === "raw" ? <EyeIcon /> : <Code2 />}
              {previewMode === "raw" ? "Preview" : "Raw Code"}
            </Button>
          </div>
        </div>
        {previewMode === "raw" ? (
          <pre className="bg-gray-900 p-4 rounded-md text-sm whitespace-pre-wrap">
            {generateReadme()}
          </pre>
        ) : (
          <div className="prose prose-invert bg-gray-900 p-4 rounded-md">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {generateReadme()}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
