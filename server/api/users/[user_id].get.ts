import { ObjectId } from "mongodb";

export default defineEventHandler(async (event) => {
    const headers = await getRequestHeaders(event)
    const token = headers?.authorization?.split(' ')[1]
    const user_id = getRouterParam(event, 'user_id')
    const verifiedToken = verifyToken(token)
    if (!verifiedToken.error) {
        const userData =  await db().collection('users').findOne({_id: new ObjectId(user_id)})
        const userFiles =  await db().collection('files').find({user_id: user_id}).toArray()

        if (userData) {
            delete userData._id
            delete userData.token
            delete userData.refresh
            setResponseStatus(200)
            return {
                statusCode: 200,
                data: {
                    user_data: userData,
                    user_files: userFiles
                }
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