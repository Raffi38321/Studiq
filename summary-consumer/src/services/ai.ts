import { GoogleGenAI } from "@google/genai"
import envVariables from "../utils/Env.js";


const ai = new GoogleGenAI({apiKey:envVariables.GEMINI_KEY});

type RequestAIProps = {
    body: string
    title: string
}


const requestAI = async ({ body, title }: RequestAIProps) => {
    const interaction = await ai.interactions.create({
        model: "gemini-3.1-flash-lite",
        input: `
            Summarize this study note and provide additional useful information.

            Return JSON with exactly these fields:
            {
            "summary": "maximum 120 words",
            "additional_info": "maximum 50 words"
            }

            Title: ${title}

            Content:
            ${body}
                    `
    })
    const output = interaction.output_text

    if (!output) {
        throw new Error("Gemini tidak mengembalikan output")
    }

    const cleanOutput = output
        .replace(/^```json\s*/, "")
        .replace(/\s*```$/, "")

    const res = JSON.parse(cleanOutput)
        // console.log("ini outpu",output);

    return {
        summary: res.summary,
        additional_info: res.additional_info
    }

}

// const coba = requestAI({
//   "title":"pengertian kafka",
//   "body":"kafka adalah event streaming platforn yang populer."})

// console.log("ini coba",coba);

export default requestAI

