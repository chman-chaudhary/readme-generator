export const generateMarkdown = (data: any, summary: string) => `
# 🚀 ${data.tagline} | ${data.location}

## 🌟 Summary
${summary}

## 🛠 Skills
${data.skills.map((skill: string) => `- ${skill}`).join("\n")}

## 📌 Projects
${data.projects
  .map(
    (project: any) =>
      `### ${project.title}\n> ${project.description}\n[View Project](${project.link})`
  )
  .join("\n\n")}

## 🏆 Experience
${data.experiences
  .map(
    (exp: any) =>
      `- **${exp.role}** at **${exp.company}**\n  - ${exp.description}`
  )
  .join("\n")}

## 🔗 Links
${Object.entries(data.socialLinks)
  .map(([key, value]) => (value ? `- **${key}**: [${value}](${value})` : ""))
  .join("\n")}

`;
