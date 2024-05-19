import {ObjectId} from "mongodb";
import {readFileAsBase64} from "~/server/utils/fileToBase64";
import {readBlock} from "~/server/utils/readBlock";

export default defineEventHandler(async (event) => {
    const headers = await getRequestHeaders(event)
    const token = headers?.authorization?.split(' ')[1]
    const file_id = getRouterParam(event, 'file_id')
    const verifiedToken = verifyToken(token)
    if (!verifiedToken.error) {
        const file =  readBlock(await db().collection('files').findOne({_id: new ObjectId(file_id) }))
        if (file) {
            const fileData = await readFileAsBase64(file.url)
            if (fileData.success) {
                file.file_base64 = fileData.data
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