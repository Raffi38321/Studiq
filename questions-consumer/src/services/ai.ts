import { GoogleGenAI } from "@google/genai";
import envVariable from "../utils/Env.js";

const ai = new GoogleGenAI({ apiKey: envVariable.GEMINI_API })

interface INote {
    title: string,
    body:string
}

const generateQuestion = async ({ title, body }:INote) => {
    const interaction = await ai.interactions.create({
        model: "gemini-3.1-flash-lite",
        input: `generate one essay question from this note
        RETURB JSON WITH EXACTLY THESE FIELD
        {
            "question":"maximum 30 word"
        }
        title:${title}
        content:${body}
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
    return { question:res.question}
}

export default generateQuestion