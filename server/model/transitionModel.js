import mongoose from "mongoose";

const transationSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    plan: { type: String, required: true },
    amount: { type: Number, required: true },
    credit: { type: Number, required: true },
    payment: { type: Boolean, default: false },
    date: { type: Number }
})




//creating thr global model for gthe db
const transationModel =  mongoose.model("transation", transationSchema);

// Drop the old unique index on 'plan' if it exists
mongoose.connection.once("open", async () => {
  try {
    const indexes = await mongoose.connection.collection("transations").indexes();
    const hasPlanIndex = indexes.some((idx) => idx.name === "plan_1");

    if (hasPlanIndex) {
      await mongoose.connection.collection("transations").dropIndex("plan_1");
      console.log("✅ Dropped unique index 'plan_1' on transations collection.");
    } else {
      console.log("ℹ️ Index 'plan_1' not found. No need to drop.");
    }
  } catch (err) {
    console.error("❌ Failed to drop index 'plan_1':", err.message);
  }
});
export default transationModel;