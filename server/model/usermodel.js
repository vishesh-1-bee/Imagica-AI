import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    creditBalance: { type: Number, default: 5 }
})

//code for hash the password
userSchema.pre('save', async function (next) {
    //this keyword has been used here 
    const user = this
    if (!user.isModified("password")) {
        next()
    } try {
      const saltRound = await bcrypt.genSalt(10)
      const hashPassword= await bcrypt.hash(user.password , saltRound)
      user.password = hashPassword
    } catch (error) {
        next(error)
    }
})

//creating token so it can be used universally in the whole program
userSchema.methods.generateToken= async function(){
    try {
         return jwt.sign({
            userid: this._id.toString(),
            email: this.email,
         },
        //jwt screat key
        process.env.JWT_KEY_value,
         {expiresIn: "20d"}
        )
    } catch (error) {
        console.log({message: error});
        
    }
}



//creating thr global model for gthe db
const userModel = new mongoose.model("user", userSchema);
export default userModel;