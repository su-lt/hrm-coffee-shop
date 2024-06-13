"use strict"
require("../branch.model") // for populate
const userModel = require("../user.model")

export const findUserById = async (id) => {
    return await userModel.findById(id).select("-password")
}

export const getTotalEmployee = async () => {
    const totalEmployee = await userModel
        .find({ role: "employee" })
        .countDocuments()
    const totalNewEmployee = await userModel
        .find({ role: "employee", status: "inactive" })
        .countDocuments()
    return { totalEmployee, totalNewEmployee }
}

export const findUserWithPopulateById = async (id) => {
    return await userModel
        .findById(id)
        .populate([{ path: "branch", options: { strictPopulate: false } }])
        .select("-password")
}

export const findByIdAndUpdate = async (id, payload) => {
    return await userModel
        .findByIdAndUpdate(id, payload, { new: true })
        .select("-password")
}

export const findUserByEmail = async (email) => {
    return await userModel.findOne({ email })
}

export const findAllUsers = async () => {
    return await userModel.find({}).select("-password").lean()
}

export const getAllEmployees = async () => {
    return await userModel.find({ role: "employee" }).select("-password").lean()
}

export const createUser = async (requestData) => {
    const newUser = new userModel(requestData)
    return await newUser.save()
}
