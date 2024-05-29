"use strict"
require("../branch.model") // for populate
const userModel = require("../user.model")

export const findUserById = async (id) => {
    return await userModel
        .findById(id)
        .populate([{ path: "branch", options: { strictPopulate: false } }])
        .lean()
}

export const findUserByEmail = async (email) => {
    return await userModel.findOne({ email })
}

export const findAllUsers = async () => {
    return await userModel
        .find({})
        .populate([{ path: "branch", options: { strictPopulate: false } }])
        .lean()
}

export const createUser = async (requestData) => {
    const newUser = new userModel(requestData)
    return await newUser.save()
}
