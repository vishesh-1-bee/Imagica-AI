import express from 'express' 
import { home , register , login } from '../controllers/authcontroler.js'



const routes = express.Router()
routes.route("/home").get(home)
routes.route("/register").post(register)
routes.route("/login").post(login)

export default routes