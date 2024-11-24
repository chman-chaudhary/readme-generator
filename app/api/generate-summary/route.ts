import { NextApiRequest, NextApiResponse } from "next";
// import { Configuration, OpenAIApi } from 'openai';

// const config = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(config);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {
      tagline,
      location,
      skills,
      projects,
      experiences,
      futureExpectations,
    } = req.body;

    const prompt = `
Generate an interesting summary for a GitHub README:
- Tagline: ${tagline}
- Location: ${location}
- Skills: ${skills.join(", ")}
- Projects: ${projects.map((p: any) => p.title).join(", ")}
- Experiences: ${experiences.map((e: any) => e.role).join(", ")}
- Future Expectations: ${futureExpectations}
    `;

    try {
      //   const response = await openai.createCompletion({
      //     model: 'text-davinci-003',
      //     prompt,
      //     max_tokens: 150,
      //   });
      const response = {
        data: {
          choices: [{ text: "" }],
        },
      };
      res.status(200).json({ summary: response.data.choices[0].text });
    } catch (error) {
      res.status(500).json({ error: "Failed to generate summary" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
