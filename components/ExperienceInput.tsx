import { useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

interface Experience {
  role: string;
  company: string;
  description: string;
}

interface ExperienceInputProps {
  addExperience: (experience: Experience) => void;
  experiences: Experience[];
}

export default function ExperienceInput({
  addExperience,
  experiences,
}: ExperienceInputProps) {
  const [experience, setExperience] = useState<Experience>({
    role: "",
    company: "",
    description: "",
  });

  const handleAddExperience = () => {
    if (
      experience.role.trim() &&
      experience.company.trim() &&
      experience.description.trim()
    ) {
      addExperience(experience);
      setExperience({ role: "", company: "", description: "" });
    }
  };

  return (
    <div>
      <label className="block text-neon font-bold mb-2">Experience</label>
      <Input
        type="text"
        className="input mb-2"
        placeholder="Role"
        value={experience.role}
        onChange={(e) => setExperience({ ...experience, role: e.target.value })}
      />
      <Input
        type="text"
        className="input mb-2"
        placeholder="Company"
        value={experience.company}
        onChange={(e) =>
          setExperience({ ...experience, company: e.target.value })
        }
      />
      <Textarea
        className="textarea mb-2"
        placeholder="Description"
        value={experience.description}
        onChange={(e) =>
          setExperience({ ...experience, description: e.target.value })
        }
      ></Textarea>
      <Button onClick={handleAddExperience} className="button">
        Add Experience
      </Button>
      <ul className="mt-2 space-y-2">
        {experiences.map((exp, index) => (
          <li key={index} className="text-sm text-gray-300">
            <strong>{exp.role}</strong> at {exp.company}: {exp.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
