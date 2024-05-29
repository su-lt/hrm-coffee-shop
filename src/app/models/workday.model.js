"use strict"
const { models, model, Schema } = require("mongoose") // Erase if already required

// Declare the Schema of the Mongo model
const workdaySchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        date: { type: Date, required: true },
        checkInTime: { type: Date, required: true },
        checkOutTime: { type: Date },
    },
    {
        timestamps: true,
    }
)

//Export the model
module.exports = models.Workday || model("Workday", workdaySchema)
