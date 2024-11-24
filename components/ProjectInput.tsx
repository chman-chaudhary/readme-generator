import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

interface Project {
  title: string;
  description: string;
  link: string;
}

interface ProjectInputProps {
  addProject: (project: Project) => void;
  projects: Project[];
}

export default function ProjectInput({
  addProject,
  projects,
}: ProjectInputProps) {
  const [project, setProject] = useState<Project>({
    title: "",
    description: "",
    link: "",
  });

  const handleAddProject = () => {
    if (
      project.title.trim() &&
      project.description.trim() &&
      project.link.trim()
    ) {
      addProject(project);
      setProject({ title: "", description: "", link: "" });
    }
  };

  return (
    <div>
      <label className="block text-neon font-bold mb-2">Projects</label>
      <Input
        type="text"
        className="input mb-2"
        placeholder="Project Title"
        value={project.title}
        onChange={(e) => setProject({ ...project, title: e.target.value })}
      />
      <Textarea
        className="textarea mb-2"
        placeholder="Project Description"
        value={project.description}
        onChange={(e) =>
          setProject({ ...project, description: e.target.value })
        }
      ></Textarea>
      <Input
        type="text"
        className="input mb-2"
        placeholder="Project Link"
        value={project.link}
        onChange={(e) => setProject({ ...project, link: e.target.value })}
      />
      <Button onClick={handleAddProject} className="button">
        Add Project
      </Button>
      <ul className="mt-2 space-y-2">
        {projects.map((p, index) => (
          <li key={index} className="text-sm text-gray-300">
            <strong>{p.title}:</strong> {p.description} (
            <a href={p.link} className="text-neon">
              Link
            </a>
            )
          </li>
        ))}
      </ul>
    </div>
  );
}
