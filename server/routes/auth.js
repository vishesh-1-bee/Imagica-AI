import express from 'express' 
import { home , register , login  , userCredit} from '../controllers/authcontroler.js'
import { authMiddleware } from '../middleware/userauth.js'


const routes = express.Router()
routes.route("/home").get(home)
routes.route("/register").post(register)
routes.route("/login").post(login)
routes.route("/user").get(authMiddleware , userCredit)

export default routes