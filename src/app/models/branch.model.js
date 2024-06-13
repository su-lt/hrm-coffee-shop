"use strict"
const { models, model, Schema } = require("mongoose") // Erase if already required

// Declare the Schema of the Mongo model
const branchSchema = new Schema(
    {
        name: { type: String, required: true },
        address: { type: String, required: true },
        shopId: { type: Schema.Types.ObjectId, ref: "Shop" },
        location: {
            latitude: { type: Number, required: true },
            longitude: { type: Number, required: true },
        },
        maxDistance: { type: Number, default: 50 },
        isDeleted: { type: Date, default: null },
    },
    {
        timestamps: true,
    }
)

//Export the model
module.exports = models.Branch || model("Branch", branchSchema)
