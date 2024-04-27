import {db} from "~/server/utils/db";
import {verifyPassword} from "~/server/utils/password";
import {generateRefresh, generateToken, verifyToken} from "~/server/utils/token";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const user = await db().collection("users").findOne({email: body.email});
    const passwordsMatch = await verifyPassword(body.password, user.password);

    if (passwordsMatch) {
        const refreshExpired = verifyToken(user.refresh).error
        const token = generateToken({user_id: user._id, email: user.email, role: user.role});
        if (refreshExpired) {
            user.refresh = generateRefresh({user_id: user._id, email: user.email, role: user.role});
        }
        setResponseStatus(event, 200)
        return {
            token: token,
            refresh: user.refresh
        }
    }

    if (!user) {
        setResponseStatus(event, 401)
        return {
            error: 'invalid data'
        }
    }

    if (user.password !== body.password) {
        setResponseStatus(event, 401)
        return {
            error: 'invalid data'
        }
    }
})