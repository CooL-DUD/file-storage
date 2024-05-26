import {ObjectId} from "mongodb";

export default defineEventHandler(async (event) => {
    const headers = await getRequestHeaders(event)
    const token = headers?.authorization?.split(' ')[1]
    const verifiedToken = verifyToken(token)
    if (!verifiedToken.error) {
        const users =  await db().collection('users').aggregate([
            { $project: { lastBlockchainElement: { $arrayElemAt: ['$blockchain', -1] } } }
        ]).toArray();

        if (users) {
            setResponseStatus(200)
            return {
                statusCode: 200,
                data: users.map(item => ({
                    _id: item._id,
                    email: item.lastBlockchainElement.data.email,
                    first_name: item.lastBlockchainElement.data.first_name,
                    last_name: item.lastBlockchainElement.data.last_name,
                    role: item.lastBlockchainElement.data.role,
                    avatar: item.lastBlockchainElement.data.avatar,
                }))
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