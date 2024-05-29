const bcrypt = require("bcrypt")
const JWT = require("jsonwebtoken")

const createSessionToken = async (payload) => {
    // get random key
    let randomKey = (Math.random() + 1).toString(36).substring(2)
    // hash key to get private key
    const privateKey = await bcrypt.hash(randomKey, 10)
    // get sesstion token
    const sessionToken = await JWT.sign(payload, privateKey, {
        expiresIn: "7 days",
    })

    return { privateKey, sessionToken }
}

const verifySessionKey = async (key, signature) => {
    return await JWT.verify(key, signature)
}

module.exports = {
    createSessionToken,
    verifySessionKey,
}
