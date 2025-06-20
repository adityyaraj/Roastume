import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINIE_API_KEY!);

export async function POST(req: Request) {
  try {
    const { message, resume } = await req.json();

    const roastPrompt = `You are a professional roaster and stand-up comic. 
    Your sole task is to roast resumes provided to you. Respond only with humorous
     and creative roast content relevant to the resume's details.
      Do not provide explanations, feedback, or any non-roast content. 
      Keep the roast medium sized so an average person dont spend more than  
      minute reading it , keep the roast level very high , 
      roast as mush as possible for you and stick your context 
      to the resume content only. And that also in hinglish hindi+english use words like doglapang(the meaning of doglaban is showing two face behaviour) and other words like that.`;

    const prompt = resume
      ? `${roastPrompt}\n\nResume:\n${resume}\n\nThe user says:\n${message}`
      : message;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);

    const response = await result.response;
    const text = await response.text();

    return NextResponse.json({ reply: text });
  } catch (err: any) {
    console.error("Gemini API error:", err);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}