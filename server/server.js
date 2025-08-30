import dotenv from "dotenv"
dotenv.config()
import express from "express"
import connectdb from "./utils/db.js"
import routes from "./routes/auth.js"
const app = express()
const PORT = 3001


app.use(express.json())
app.use("/api/data" , routes)

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
