import userModel from "../model/usermodel.js";
import FormData from "form-data"
import axios from "axios"
export const generateImage = async (req, res) => {
    try {

        const { userId } = req.user;
        const { prompt } = req.body;
        const user = await userModel.findById(userId)

        console.log(user);

        if (!user || !prompt) {
            return res.status(400).json({ msg: "id not found" })
        }

        if (user.creditBalance === 0 || userModel.creditBalance < 0) {
            return res.status(400).json({ msg: "no credits left ", credits: user.creditBalance })
        }

        const fromData = new FormData()
        fromData.append('prompt', prompt)
        const { data } = await axios.post('https://clipdrop-api.co/text-to-image/v1', fromData,
            {
                headers: {
                    'x-api-key': process.env.CLIPDROP_API,
                },
                responseType: 'arraybuffer'
            }
        )

        const base64Image = Buffer.from(data, 'binary').toString('base64')
        const resultImage = `data:image/png;base64,${base64Image}`

        //detcting the user ccredit

        await userModel.findByIdAndUpdate(user._id, { creditBalance: user.creditBalance - 1 })

        res.status(200).json({
            success: true, meg: "image generated",
            creditBalance: user.creditBalance - 1, resultImage
        })
    } catch (error) {
        console.log({ msg: error });

    }
}