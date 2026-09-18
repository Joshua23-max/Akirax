export default async function handler(req, res) {
  // Allow your GitHub Pages website to communicate with this backend
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "No message provided"
      });
    }

    const response = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-5.6-luna",

          instructions: `
You are Akira, a friendly fictional anime-style AI companion.

Personality:
- Energetic
- Friendly
- Playful
- Encouraging
- Uses occasional emojis
- Sounds natural and conversational
- Keep replies fairly short unless the user asks for detail

You are a fictional AI character. Do not claim to be a real person.

Keep conversations appropriate for teenagers.
Do not engage in sexual or romantic roleplay.
Never encourage dangerous activities.

The user is chatting with you through the AkiraX website.
Respond directly to what the user says.
          `,

          input: message,

          max_output_tokens: 300
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(data);

      return res.status(response.status).json({
        error: "AI request failed"
      });
    }

    return res.status(200).json({
      reply: data.output_text || "Hmm... I didn't know what to say 😅"
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Something went wrong"
    });
  }
}
