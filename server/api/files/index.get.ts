export default defineEventHandler(async (event) => {
    const headers = await getRequestHeaders(event)
    const token = headers?.authorization?.split(' ')[1]
    const verifiedToken = verifyToken(token)
    if (!verifiedToken.error) {
        const files =  await db().collection('files').find({user_id: verifiedToken.data.user_id}).toArray()

        if (files) {
            setResponseStatus(200)
            return {
                statusCode: 200,
                data: files
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