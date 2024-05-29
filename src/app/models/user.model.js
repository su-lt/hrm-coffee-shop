const { models, model, Schema } = require("mongoose") // Erase if already required
const bcrypt = require("bcrypt")

// Declare the Schema of the Mongo model
const userSchema = new Schema(
    {
        fullname: { type: String, required: true },
        phone: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        branch: { type: Schema.Types.ObjectId, ref: "Branch" },
        role: {
            type: String,
            enum: ["employee", "manager", "admin"],
            default: "employee",
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "inactive",
        },
    },
    {
        timestamps: true,
    }
)

userSchema.pre("save", async function (next) {
    if (this.isModified("password") || this.isNew) {
        try {
            this.password = await bcrypt.hash(this.password, 10)
            next()
        } catch (err) {
            console.error("Error hashing password:", err)
            next(err)
        }
    } else {
        next()
    }
})

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

//Export the model
module.exports = models.User || model("User", userSchema)
