"use strict"
const workdayModel = require("../workday.model")

export const findAllWorkdayByUserId = async (userId) => {
    return await workdayModel.find({ userId }).lean()
}

export const findCurrentWorkdayByUserId = async (userId) => {
    const now = new Date()

    return await workdayModel.findOne({
        userId,
        date: {
            $eq: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
        },
    })
}

export const checkIn = async (userId) => {
    const now = new Date()

    return await workdayModel.create({
        userId,
        date: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
        checkInTime: now,
    })
}
