import mongoose from 'mongoose'
import bcrypt from "bcrypt"
const { Schema } = mongoose

const UserSchema = new Schema({
    name: {
        require: true,
        type: String,
    },
    email: {
        type: String,
        required: true,
      },
    age: {
        type: Number,
        min: 18,
    },
    password: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'task',
        },
    ],
},{timestamps:true})
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
const User = mongoose.model('User', UserSchema)
export default User;