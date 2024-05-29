"use strict"
const { models, model, Schema } = require("mongoose") // Erase if already required

// Declare the Schema of the Mongo model
const keySchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        privateKey: { type: String, required: true },
        expiredAt: { type: Date, required: true },
        sessionTokenUsed: { type: Array, default: [] },
    },
    {
        timestamps: true,
    }
)

//Export the model
module.exports = models.Key || model("Key", keySchema)
