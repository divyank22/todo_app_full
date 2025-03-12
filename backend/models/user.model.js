import mongoose from "mongoose";
const {schema } = mongoose;

const UserSchema = new schema(
    {
        name : {}
    }
)
const User = mongoose.model("User",UserSchema);
export default User;