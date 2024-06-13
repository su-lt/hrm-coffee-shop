"use strict"
import branchModel from "../branch.model"
import shopModel from "../shop.model"

export const findShop = async () => {
    return await shopModel.findOne().lean()
}

export const findShopAndUpdate = async (payload) => {
    return await shopModel.findOneAndUpdate({}, payload, { new: true })
}

export const getAllBranches = async () => {
    return await branchModel.find({ isDeleted: null }).lean()
}

export const getBranchById = async (id) => {
    return await branchModel.findOne({ _id: id, isDeleted: null }).lean()
}

export const findBranchAndUpdateById = async (id, payload) => {
    return await branchModel
        .findOneAndUpdate({ _id: id, isDeleted: null }, payload, {
            new: true,
        })
        .lean()
}

export const findBranchAndDeleteById = async (_id) => {
    return await branchModel
        .findOneAndUpdate(
            { _id, isDeleted: null },
            { isDeleted: new Date() },
            { new: true }
        )
        .lean()
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
