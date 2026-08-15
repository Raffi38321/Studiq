import mongoose, { Schema, type ObjectId, Types } from "mongoose";

interface IQuestion {
    note_id: ObjectId,
    question: string,
    answer: string,
    score: number,
    ai_answer:string
}

const questionSchema = new Schema<IQuestion>({
    note_id: { type: Types.ObjectId,ref:"Note", required: true },
    question: { type: String },
    answer: { type: String },
    score: { type: Number },
    ai_answer:{type:String},
})

const Question = mongoose.model("Question", questionSchema)
export default Question