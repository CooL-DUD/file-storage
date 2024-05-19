import {readBlock} from "~/server/utils/readBlock";

export default defineEventHandler(async (event) => {
    const headers = await getRequestHeaders(event)
    const token = headers?.authorization?.split(' ')[1]
    const verifiedToken = verifyToken(token)
    if (!verifiedToken.error) {
        const files =  await db().collection('files').find({'data.user_id': verifiedToken.data.user_id}).toArray()

        if (files) {
            setResponseStatus(200)
            let data = files.map(file => (
                {...readBlock(file), _id: file._id}
            ))
            return {
                statusCode: 200,
                data: data
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