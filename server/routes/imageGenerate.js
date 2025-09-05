import express from "express"
import {generateImage} from '../controllers/imageController.js'
import { authMiddleware } from '../middleware/userauth.js'

const imageRoute= express.Router()

imageRoute.route("/image-generate").post(authMiddleware ,generateImage)

export default imageRoute