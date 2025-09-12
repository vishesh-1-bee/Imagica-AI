import dotenv from "dotenv"
dotenv.config()
import express from "express"
import connectdb from "./utils/db.js"
import routes from "./routes/auth.js"
import imageRoute from "./routes/imageGenerate.js"
import cors from 'cors'
const app = express()
const PORT = 3001


//code for the cors error 

const corsoptions = {
  origin: "http://localhost:5173",
  methods: "GET , POST , PUT , PATCH",
  credential: true
}
app.use(cors(corsoptions))
app.use(express.json())
app.use("/api/auth", routes)
app.use("/api/image", imageRoute )
app.get("/favicon.ico", (req, res) => res.status(204));
app.get("/" , (req , res)=>{
    console.log("it is running");
    
    res.status(200).send("response from the server")
})
connectdb().then(
    app.listen(PORT, ()=>{
    console.log(`server is running on the  http://localhost:${PORT}`);
   
})
)
