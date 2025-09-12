import userModel from "../model/usermodel.js";
import FormData from "form-data";
import axios from "axios";

export const generateImage = async (req, res) => {
  try {
    const { userId } = req.user;
    const token = req.token; 
    const { prompt } = req.body;

    if (!token || !prompt) {
      return res.status(400).json({ msg: "Token or prompt not provided" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (user.creditBalance <= 0) {
      return res.status(400).json({ msg: "No credits left", credits: user.creditBalance });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);

    const clipdropResponse = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API,
          ...formData.getHeaders()
        },
        responseType: "arraybuffer"
      }
    );

    const base64Image = Buffer.from(clipdropResponse.data, "binary").toString("base64");
    const resultImage = `data:image/png;base64,${base64Image}`;

    await userModel.findByIdAndUpdate(userId, {
      creditBalance: user.creditBalance - 1
    });

    res.status(200).json({
      success: true,
      msg: "Image generated successfully",
      creditBalance: user.creditBalance - 1,
      resultImage
    });
  } catch (error) {
    console.error("Error generating image:", error);
    res.status(500).json({ msg: "Internal server error", error: error.message });
  }
};
