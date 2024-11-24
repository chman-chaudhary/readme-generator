import { Input } from "./ui/input";

interface SocialLinks {
  linkedin: string;
  twitter: string;
  instagram: string;
  portfolio: string;
  linkedIn: string;
  other: string;
}

interface SocialLinksInputProps {
  socialLinks: SocialLinks;
  setSocialLinks: (links: SocialLinks) => void;
}

export default function SocialLinksInput({
  socialLinks,
  setSocialLinks,
}: SocialLinksInputProps) {
  const handleChange = (key: keyof SocialLinks, value: string) => {
    setSocialLinks({ ...socialLinks, [key]: value });
  };

  return (
    <div>
      <label className="block text-neon font-bold mb-2">Social Links</label>
      <Input
        type="text"
        className="input mb-2"
        placeholder="LinkedIn"
        value={socialLinks.linkedin}
        onChange={(e) => handleChange("linkedin", e.target.value)}
      />
      <Input
        type="text"
        className="input mb-2"
        placeholder="Twitter"
        value={socialLinks.twitter}
        onChange={(e) => handleChange("twitter", e.target.value)}
      />
      <Input
        type="text"
        className="input mb-2"
        placeholder="Instagram"
        value={socialLinks.instagram}
        onChange={(e) => handleChange("instagram", e.target.value)}
      />
      <Input
        type="text"
        className="input mb-2"
        placeholder="Portfolio"
        value={socialLinks.portfolio}
        onChange={(e) => handleChange("portfolio", e.target.value)}
      />
      <Input
        type="text"
        className="input mb-2"
        placeholder="Linked In"
        value={socialLinks.linkedIn}
        onChange={(e) => handleChange("linkedIn", e.target.value)}
      />
      <Input
        type="text"
        className="input mb-2"
        placeholder="Other"
        value={socialLinks.other}
        onChange={(e) => handleChange("other", e.target.value)}
      />
    </div>
  );
}
