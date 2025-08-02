import User from '../models/user.model.js'
const login = async (req, res) => {
    try {
        const { email, password } = req.body
        //find the credentials from the database
        const user = await User.findByCredentials(email, password)
        //generate a token
        const token = await user.generateAuthToken()
        res.status(200).send({
                token
        })
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
}
export default login;
