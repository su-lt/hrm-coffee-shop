"use strict"
const keyModel = require("../key.model")

const findKeyByUserId = async (userId) => {
    return await keyModel.findOne({ userId }).lean()
}

const createKey = async ({ userId, privateKey }) => {
    const expiredAt = new Date().getTime() + 7 * 24 * 60 * 60 * 1000 // 7days

    return await keyModel.findOneAndUpdate(
        {
            // filter by user
            userId,
        },
        {
            // value
            privateKey,
            expiredAt,
        },
        {
            // update or create
            upsert: true,
            new: true,
        }
    )
}

module.exports = { findKeyByUserId, createKey }
