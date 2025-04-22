import mongoose,{Schema} from "mongoose";

const userSchema = new Schema({
    firstName:{
        required: true,
        type: String
    },
    lastName:{
        required: true,
        type: String
    },
    password:{
        required: false,
        type: String
    },
    email:{
        required: true,
        type: String
    },
    phone:{
        required: false,
        type: String
    },
    role:{
        required: true,
        type: String
    },
    bio:{
        required: false,
        type: String
    },
    socialMedia:{
        required: false,
        type: Object
    },
    profilePicture:{
        required: false,
        type: String
    },
    designation:{
        required: false,
        type: String
    },
});

export const User = mongoose.model.User ?? mongoose.model("User",userSchema);