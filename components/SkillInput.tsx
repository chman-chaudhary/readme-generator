import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface SkillInputProps {
  addSkill: (skill: string) => void;
  skills: string[];
}

export default function SkillInput({ addSkill, skills }: SkillInputProps) {
  const [skill, setSkill] = useState("");

  const handleAddSkill = () => {
    if (skill.trim() !== "") {
      addSkill(skill);
      setSkill("");
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-400">Skills</label>
      <div className="flex mt-1 space-x-2">
        <Input
          type="text"
          className="shadcn-input w-full"
          placeholder="Add a skill"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        />
        <Button onClick={handleAddSkill} variant={"destructive"}>
          Add
        </Button>
      </div>
      <ul className="mt-2 space-y-1">
        {skills.map((s, index) => (
          <li key={index} className="text-sm text-gray-300">
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}
