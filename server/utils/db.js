import mongoose from "mongoose";

const connectdb = async () => {
    try {
        const URI = process.env.MONGO_URI
        console.log("database url is", process.env.MONGO_URI);
        await mongoose.connect(URI)
        console.log("connection ddone sucessfully");
    } catch (error) {
        console.log("could not connect to the database" , error.message);

    }
}
export default connectdb