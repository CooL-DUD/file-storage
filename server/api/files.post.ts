import {saveBase64ToFile} from "~/server/utils/saveFiles";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const headers = await getRequestHeaders(event)
    const token = headers?.authorization?.split(' ')[1]
    const verifiedToken = verifyToken(token)
    if (!verifiedToken.error) {
        const fileSaved = await saveBase64ToFile(body.file_name, body.file_base64)

        if (fileSaved.success) {
            const file =  await db().collection('files').insertOne({
                user_id: verifiedToken.data.user_id,
                file_name: body.file_name,
                size: body.size,
                type: body.type,
                url: 'url to the file',
            })

            if (file.acknowledged) {
                setResponseStatus(event, 200)

                return {
                    statusCode: 200,
                    body,
                    verifiedToken
                }
            }
        } else {
            setResponseStatus(event, 500)

            return {
                statusCode: 500,
                error: 'cannot save file',
                add: fileSaved
            }
        }
    }
})