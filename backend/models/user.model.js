import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const { Schema } = mongoose

const UserSchema = new Schema(
    {
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
        tokens: [{
            token: {
                type: String,
                required: true
            }
        }],
        tasks: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'task',
            },
        ],

    },
    { timestamps: true }
)
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})
UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}
UserSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Unable to Signin')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to Signin')
    }
    return user
    
}
UserSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({_id: user._id.toString() }, process.env.JWT_SECRET,{ expiresIn: '7d' })
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

const User = mongoose.model('User', UserSchema)
export default User
