const JWT = require('jsonwebtoken')
const createError = require('http-errors')

//const client = require('./init_redis')

module.exports = {
    signAccessToken: (userId, email, role) => {
        return new Promise((resolve, reject) => {
            const payload = {
                email: email,
                role: role
            }
            const secret = process.env.ACCESS_TOKEN_SECRET
            const options = {
                expiresIn: '1h',
                issuer: 'cs615project',
                audience: userId,
            }
            JWT.sign(payload, secret, options, (err, token) => {
                if (err) {
                    console.log(err.message)
                    reject(createError.InternalServerError())
                    return
                }
                resolve(token)
            })
        })
    },
    verifyAccessToken: (req, res) => {
        if (!req.headers['authorization']) return createError.Unauthorized()
        const authHeader = req.headers['authorization']
        const bearerToken = authHeader.split(' ')
        const token = bearerToken[1]
        const userInfo = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if (err) {
                const message =
                    err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
                return createError.Unauthorized(message)
            }
            req.payload = payload
            return payload
        })
        return userInfo
    },
    signRefreshToken: (userId, email, role) => {
        return new Promise((resolve, reject) => {
            const payload = {
                email: email,
                role: role
            }
            const secret = process.env.REFRESH_TOKEN_SECRET
            const options = {
                expiresIn: '1y',
                issuer: 'cs615project',
                audience: userId,
            }
            JWT.sign(payload, secret, options, (err, token) => {
                if (err) {
                    console.log(err.message)
                    // reject(err)
                    reject(createError.InternalServerError())
                }

                client.SET(userId, token, 'EX', 365 * 24 * 60 * 60, (err, reply) => {
                    if (err) {
                        console.log(err.message)
                        reject(createError.InternalServerError())
                        return
                    }
                    resolve(token)
                })
            })
        })
    },
    verifyRefreshToken: (refreshToken) => {
        return new Promise((resolve, reject) => {
            JWT.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET,
                (err, payload) => {
                    if (err) return reject(createError.Unauthorized())
                    const userId = payload.aud
                    client.GET(userId, (err, result) => {
                        if (err) {
                            console.log(err.message)
                            reject(createError.InternalServerError())
                            return
                        }
                        if (refreshToken === result) return resolve(userId)
                        reject(createError.Unauthorized())
                    })
                }
            )
        })
    },
}
