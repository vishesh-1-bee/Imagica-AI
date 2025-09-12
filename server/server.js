import dotenv from "dotenv"
dotenv.config()
import express from "express"
import connectdb from "./utils/db.js"
import routes from "./routes/auth.js"
import imageRoute from "./routes/imageGenerate.js"
import cors from 'cors'
const app = express()
const PORT = 3001


// ✅ CORS whitelist
const whitelist = [
  "http://localhost:5173",
  "https://imagica-ai-frontend.onrender.com",
];

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH"],
};

app.use(cors( corsOptions))
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
