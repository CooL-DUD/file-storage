import {ObjectId} from "mongodb";

export default defineEventHandler(async (event) => {
    const headers = await getRequestHeaders(event)
    const token = headers?.authorization?.split(' ')[1]
    const verifiedToken = verifyToken(token)
    if (!verifiedToken.error) {
        const query = getQuery(event);
        const page = parseInt(query.page) || 1;
        const limit = parseInt(query.limit) || 10;
        const skip = (page - 1) * limit;

        const usersCollection = db().collection('users');

        // Get the total count of users
        const totalUsers = await usersCollection.countDocuments();
        const users =  await usersCollection.aggregate([
            { $project: { lastBlockchainElement: { $arrayElemAt: ['$blockchain', -1] } } },
            { $skip: skip },
            { $limit: limit }
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
                })),
                pagination: {
                    totalUsers: totalUsers,
                    currentPage: page,
                    totalPages: Math.ceil(totalUsers / limit),
                    pageSize: limit
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