import mongoose from "mongoose";

const Schema = mongoose.Schema
const todoSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    id: {
        type: Number,
    },
    complete: {
        type: Boolean,
    },
    category: {
        type: String,
    }
})

export const Todos = mongoose.model('Todos', todoSchema, "ToDos")