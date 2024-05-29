import mongoose from "mongoose"
import shopModel from "@/app/models/shop.model"

const connectDB = async () => {
    if (mongoose?.connections[0].readyState) return true
    mongoose
        .connect(process.env.MONGODB_URI)
        .then((_) => {
            console.log("Connected MongoDB Successfully")
            initial()
        })
        .catch(() => console.log("Error Connect MongoDB!!"))
}

// initial data (shop)
const initial = async () => {
    try {
        // check shop exist
        const foundShop = await shopModel.findOne()
        // if not exist, create
        if (!foundShop)
            await shopModel.create({
                name: "Room 44 Caffe",
                phone: "0906123495",
                email: "room44.caffe@gmail.com",
            })
    } catch (error) {
        console.error("Error initializing roles:", error)
    }
}

export default connectDB
