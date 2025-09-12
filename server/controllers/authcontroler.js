import dotenv from "dotenv";
dotenv.config();
import userModel from "../model/usermodel.js";
import bcrypt from "bcryptjs";
import razorpay from "razorpay"

import transationModel from "../model/transitionModel.js";
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
            username: user.name
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
                username: userExist.name,
                credit: userExist.creditBalance
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
        res.status(200).json({ user: userdeatils })


    } catch (error) {
        console.log({ msg: error });

    }
}

const razorpayInatance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

export const paymentRazorpay = async (req, res) => {

    try {
        const { userId } = req.user;
        // const token = req.token;
        const { planId  } = req.body;

        const userdata = await userModel.findById(userId);
        if (!userId || !planId) {
            return res.status(400).json({ msg: "information is missing" })
        }

        //if we have all the details then we wil store them in the variable
        let credit, plan, amount, date

        //we are using switch case to check the type of plan
        switch (planId) {
            case 'Basic':
                plan = 'Basic'
                credit = 100
                amount = 10
                break;

            case 'Advanced':
                plan = 'Advanced'
                credit = 500
                amount = 50
                break;


            case 'Bussiness':
                plan = 'Bussiness'
                credit = 5000
                amount = 250
                break;


            default:
                return res.json({ success: false, message: "plan not found" })
        }
        date = Date.now()


        //creating the object that will store all the trasition data
        const transitionData = {
            userId, plan, amount, date ,credit
        }

        //creating and storing the transation data in the database
        const newTransation = await transationModel.create(
            transitionData
        )


        //creating options
        const options = {
            amount: amount * 100,
            currency: process.env.CURRENCY,
            receipt: newTransation._id

        }
        //creating the order using razorpay account
        await razorpayInatance.orders.create(options, (error, order) => {

            if (error) {
                console.log(error);
                return res.json({ success: false, message: "plan not found" })
            }
            res.json({ success: true, order })
        })
    } catch (error) {
        console.log(error);

    }
}

export const verifyRazorpayPayment = async(req, res)=>{
    try {
        const {razorpay_order_id}= req.body;
        const orderInfo = await razorpayInatance.orders.fetch(razorpay_order_id);
        if (orderInfo.status === 'paid') {
            const tadnsitionData= await transationModel.findById(orderInfo.receipt)
            if (tadnsitionData.payment) {
                return res.json({success: false , message : "payment failed"})
            }
            //add the credit to the user account
            const userData = await userModel.findById(tadnsitionData.userId)
            
            const creditbalance= userData.creditBalance + tadnsitionData.credit
            await userModel.findByIdAndUpdate(userData._id,{creditBalance:creditbalance})
            await transationModel.findByIdAndUpdate(tadnsitionData._id, {payment: true})
            res.json({success : true , message : 'credits added'})
        }else{
             res.json({success : false , message : 'payment failed'})
        }
    } catch (error) {
        console.log(error);
        
    }
}

//  const { userId } = req.body
//         const user = userModel.findById(userId);credits: userdeatils.creditBalance , id: userdeatils._id,userdeatil: userdeatils.name
//         res.json({ success: true, credit: user.creditBalance, userdetails: { name: user.name } })