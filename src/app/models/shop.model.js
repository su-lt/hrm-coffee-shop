"use strict"
const { models, model, Schema } = require("mongoose") // Erase if already required

// Declare the Schema of the Mongo model
const shopSchema = new Schema(
    {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: true },
    },
    {
        timestamps: true,
    }
)

//Export the model
const shop = models.Shop || model("Shop", shopSchema)
module.exports = shop
