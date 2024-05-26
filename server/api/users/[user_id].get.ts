import { ObjectId } from "mongodb";

export default defineEventHandler(async (event) => {
    const headers = await getRequestHeaders(event)
    const token = headers?.authorization?.split(' ')[1]
    const user_id = getRouterParam(event, 'user_id')
    const verifiedToken = verifyToken(token)
    if (!verifiedToken.error) {
        const userData =  await db().collection('users').findOne({_id: new ObjectId(user_id)})
        const userFiles =  await db().collection('files').find({'data.user_id': user_id}).toArray()

        if (userData) {
            const lastUserData = userData.blockchain[userData.blockchain.length - 1].data
            delete lastUserData._id
            delete lastUserData.token
            delete lastUserData.refresh
            setResponseStatus(200)
            return {
                statusCode: 200,
                data: {
                    user_data: lastUserData,
                    user_files: userFiles.map(file => file.data),
                    actions: userData.actions
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