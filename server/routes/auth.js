import express, { Router } from 'express' 
import { home } from '../controllers/authcontroler.js'



const routes = express.Router()
routes.route("/home").get(home)

export default routes