"use strict"
import branchModel from "../branch.model"
import shopModel from "../shop.model"

export const findShop = async () => {
    return await shopModel.findOne().lean()
}

export const getAllBranches = async () => {
    return await branchModel.find().lean()
}

export const createBranch = async ({
    name,
    address,
    shopId,
    location,
    maxDistance,
}) => {
    return await branchModel.create({
        name,
        address,
        shopId,
        location,
        maxDistance,
    })
}
