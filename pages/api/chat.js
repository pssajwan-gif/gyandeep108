import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'केवल POST रिक्वेस्ट की अनुमति है' });
  }

  const { prompt } = req.body;
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response.text();
    res.status(200).json({ reply: response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
