import z from "zod";

export const generateQuestionSchema = z.object({
    params : z.object({
        id:z.string()
    })
})