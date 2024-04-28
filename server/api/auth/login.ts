import {db} from "~/server/utils/db";
import {verifyPassword} from "~/server/utils/password";
import {generateRefresh, generateToken, verifyToken} from "~/server/utils/token";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const user = await db().collection("users").findOne({email: body.email});
    const passwordsMatch = await verifyPassword(body.password, user.password);

    if (!user) {
        setResponseStatus(event, 401)
        return {
            error: 'invalid data',
            status: 401
        }
    }

    if (passwordsMatch) {
        const refreshExpired = verifyToken(user.refresh).error
        const tokenParams ={
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