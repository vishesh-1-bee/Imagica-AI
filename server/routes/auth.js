import express from 'express' 
import { home , register ,verifyRazorpayPayment ,login  , userCredit , paymentRazorpay } from '../controllers/authcontroler.js'
import { authMiddleware } from '../middleware/userauth.js'


const routes = express.Router()
routes.route("/home").get(home)
routes.route("/register").post(register)
routes.route("/login").post(login)
routes.route("/user").get(authMiddleware , userCredit)
routes.route("/pay-razorpay").post(authMiddleware ,paymentRazorpay )
routes.route("/verify-razor").post(verifyRazorpayPayment )

export default routes