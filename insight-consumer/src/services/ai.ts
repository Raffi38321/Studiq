import { GoogleGenAI } from "@google/genai";
import envVariable from "../utils/Env.js";

const ai = new GoogleGenAI({ apiKey: envVariable.GEMINI_API })

interface IQuestion {
    question: string,
    answer: string,
}

const generateInsight = async ({ question,answer }:IQuestion) => {
    const interaction = await ai.interactions.create({
        model: "gemini-3.1-flash-lite",
        input: `rate this answer according that question and provide with correc answer
        RETURN JSON WITH EXACTLY THESE FIELD
        {
            "score": "Number in range 1 to 10",
            "ai_answer":"max 30 word"
        }
        question:${question}
        and this is user answer:${answer}
        `
    })

    const output = interaction.output_text
    if (!output) {
        throw new Error("gemini kontol");
    }

    const cleanOutput = output
        .replace(/^```json\s*/, "")
        .replace(/\s*```$/, "")
    const res = JSON.parse(cleanOutput)
    return { score:Number(res.score),ai_answer:res.ai_answer}
}

export default generateInsight
