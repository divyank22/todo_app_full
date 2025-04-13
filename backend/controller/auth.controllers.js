import User from '../models/user.model.js'
import OTP from '../models/otp.model.js'

const signup = async (req, res) => {
    try {
        const { name, email, password, age, otp } = req.body
        // Check if all details are provided
        if (!name || !email || !password || !age || !otp) {
            return res.status(403).json({
                success: false,
                message: 'All fields are required',
            })
        }
        // Check if user already exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists',
            })
        }
        // Find the most recent OTP for the email
        const response = await OTP.find({ email })
            .sort({ createdAt: -1 })
            .limit(1)
        if (response.length === 0 || otp !== response[0].otp) {
            return res.status(400).json({
                success: false,
                message: 'The OTP is not valid',
            })
        }
        const newUser = await User.create({
            name,
            email,
            password,
            age,
        })
        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: newUser,
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, error: error.message })
    }
}
export default signup
