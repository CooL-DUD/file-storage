import {db} from "~/server/utils/db";
import {hashPassword, verifyPassword} from "~/server/utils/password";
import {generateRefresh, generateToken, verifyToken} from "~/server/utils/token";
import {storeInBlockchain} from "~/server/utils/storeInBlockchain";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const user = await db().collection("users").findOne({email: body.email});

    if (!!user) {
        setResponseStatus(event, 401)
        return {
            error: 'invalid data',
            status: 401
        }
    }
    if (!user) {
        body.role = 'user'
        body.password = await hashPassword(body.password)
        const newUser = await db().collection("users").insertOne({
            blockchain: [storeInBlockchain(body, '0')]
        })

        if (newUser.acknowledged) {
            const tokenParams = {
                user_id: newUser.insertedId,
                email: body.email,
                role: body.role
            }
            const token = await generateToken(tokenParams)
            const refresh = await generateRefresh(tokenParams)

            await db().collection("users").findOneAndUpdate(
                {
                    _id: newUser.insertedId,
                },
                {
                    $set: {
                        token,
                        refresh
                    }
                }
            )

            setResponseStatus(event, 200)
            return {
                data: {
                    token,
                    refresh
                },
                status: 200
            }
        }
    }
})