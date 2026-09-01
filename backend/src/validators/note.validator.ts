import z from "zod";

const noteSchema = z.object({
    body:z.object({
        title:z.string(),
        category:z.array(z.string()),
        body:z.string()
    })
})

export default noteSchema