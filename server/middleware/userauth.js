import jwt from "jsonwebtoken"
import userModel from "../model/usermodel.js"

export const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization")

    //code if token is not there
    if (!token) {
        return res.status(401).json({ msg: "authorization failed , token not prensent" })
    }

    //codde to remeve the bearaer

    const jwtToken = token.replace("Bearer ", "").trim();
    console.log("token generated", jwtToken);

    //coed to fetch the user data
    try {
        const isVerify = jwt.verify(jwtToken, process.env.JWT_KEY_value)
        const userdata = await userModel.findOne({ email: isVerify.email }).select({ password: 0 })
        console.log(userdata);

        req.user = {
            name: userdata.name,
            email: userdata.email,
            userId: userdata._id,
            credit: userdata.creditBalance
        };
        req.token = token;
        req.id = userdata._id
        next()

    } catch (error) {
        res.status(400).json({ msg: "authorization failed , token not found" })
    }


}