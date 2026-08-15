import mongoose from "mongoose"

interface INote {
    title: string,
    category: [string],
    body: string,
    summary: string | null,
    additional_info:string | null
}

const noteSchema = new mongoose.Schema<INote>({
    title: { type: String, required: true },
    body:{type:String,required:true},
    summary:{type:String},
    additional_info: { type: String },
    category:{type:[String]}
},{timestamps:true})

const Note = mongoose.model("Note",noteSchema)

export default Note
