import {db} from "~/server/utils/db";
import {verifyPassword} from "~/server/utils/password";
import {generateRefresh, generateToken, verifyToken} from "~/server/utils/token";
import {readBlock} from "~/server/utils/readBlock";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    // const user = readBlock(await db().collection("users").findOne({email: body.email}))
    // const user = await db().collection("users").findOne({blockchain[last].email: body.email})
    const user = await db().collection("users").findOne({
        $expr: {
            $eq: [{ $arrayElemAt: ["$blockchain.data.email", -1] }, body.email]
        }
    })
    if (!user) {
        setResponseStatus(event, 401)
        return {
            error: 'invalid data',
            status: 401
        }
    }

    const userData = readBlock(user.blockchain[user.blockchain.length - 1])

    const passwordsMatch = await verifyPassword(body.password, userData.password);

    if (passwordsMatch) {
        const refreshExpired = verifyToken(user.refresh).error
        const tokenParams = {
            user_id: user._id,
            email: user.email,
            role: user.role
        }
        const token = generateToken(tokenParams);
        if (refreshExpired.error) {
            user.refresh = generateRefresh(tokenParams);
        }
        setResponseStatus(event, 200)
        return {
            data: {
                token: token,
                refresh: user.refresh
            },
            status: 200
        }
    } else {
        setResponseStatus(event, 401)
        return {
            error: 'invalid data',
            status: 401
        }
    }
})