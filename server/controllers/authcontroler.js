
import userModel from "../model/usermodel.js";
import bcrypt from "bcryptjs";
export const home = async (req, res) => {
    try {
        return res.status(200).json({ mes: "we are on the home page of rest api" })
    } catch (error) {
        console.log(error);

    }
}

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.json({ success: false, message: "missing credentials" })
        }

        //check if the user alredy exist or not 
        const userExist = await userModel.findOne({ email })
        if (userExist) {
            return res.status(400).json({ messge: "email alredy exist" })
        }
        //code to create new user

        const user = await userModel.create({ name, email, password })
        console.log(req.body);
        res.status(200).send({
            message: "registeration done ",
            token: await user.generateToken(),
            userId: user._id.toString(),
            username: userExist.name
        })

    } catch (error) {
        console.log(error);

    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await userModel.findOne({ email })
        console.log(userExist);
        if (!userExist) {
            return res.status(400).json({ message: "invalid credential" })
        }
        //comapre password for validation

        const user = await bcrypt.compare(password, userExist.password)
        if (user) {
            res.status(200).json({
                message: "login sucessfully",
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
                username: userExist.name
            })
        }
    } catch (error) {
        console.log({ msg: error });

    }


}

export const userCredit = async (req, res) => {
    try {
       const userdeatils = req.user
       console.log(userdeatils);
       res.status(200).json({ userdeatils})
       

    } catch (error) {
        console.log({ msg: error });

    }
}

//  const { userId } = req.body
//         const user = userModel.findById(userId);credits: userdeatils.creditBalance , id: userdeatils._id,userdeatil: userdeatils.name
//         res.json({ success: true, credit: user.creditBalance, userdetails: { name: user.name } })