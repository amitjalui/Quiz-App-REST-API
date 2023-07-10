import {Schema, model} from "mongoose";

// Schema
const userSchema = new Schema(
  {
    name: {
      type: String, 
      required: true
    },
    email: {
      type: String, 
      required: true,
      unique: true,
      index: true
    },
    password: {
      type: String, 
      required: true
    }
  },
  {timestamps: true}
);

// Model
const User = model("User", userSchema);

export default User;