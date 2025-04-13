import mongoose from 'mongoose'
const { Schema } = mongoose

const TaskSchema = new Schema(
    {
        title:{
            type:String,
            required:true
        },
        content: {
            type: String,
            required: true,
          },
        done: {
            type: Boolean,
            default: false,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true }
)
const Task = mongoose.model("Task",TaskSchema)
export default Task;