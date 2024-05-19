import { ObjectId } from "mongodb";
import {readBlock} from "~/server/utils/readBlock";

export default defineEventHandler(async (event) => {
    const headers = await getRequestHeaders(event)
    const token = headers?.authorization?.split(' ')[1]
    const verifiedToken = verifyToken(token)
    if (!verifiedToken.error) {
        const userData =  readBlock(await db().collection('users').findOne({_id: new ObjectId(verifiedToken.data.user_id)}))

        if (userData) {
            delete userData._id
            delete userData.token
            delete userData.refresh
            setResponseStatus(200)
            return {
                statusCode: 200,
                data: userData
            }
        }

    } else {
        setResponseStatus(event, 401)
        return {
            statusCode: 401,
            error: 'unauthorized',
            verifiedToken: verifiedToken
        }
    }
})