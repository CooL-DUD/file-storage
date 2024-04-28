import {ObjectId} from "mongodb";
import {readFileAsBase64} from "~/server/utils/fileToBase64";
import {deleteFile} from "~/server/utils/deleteFile";

export default defineEventHandler(async (event) => {
    const headers = await getRequestHeaders(event)
    const token = headers?.authorization?.split(' ')[1]
    const file_id = getRouterParam(event, 'file_id')
    const verifiedToken = verifyToken(token)
    if (!verifiedToken.error) {
        const file =  await db().collection('files').findOne({_id: new ObjectId(file_id) })
        if (file) {
            const fileDeleted = await deleteFile(file.url)
            if (fileDeleted.success) {
                await db().collection('files').deleteOne({_id: new ObjectId(file_id) })
                setResponseStatus(200)
                return {
                    statusCode: 200,
                    data: file
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