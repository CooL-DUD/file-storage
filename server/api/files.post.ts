import {saveBase64ToFile} from "~/server/utils/saveFiles";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const headers = await getRequestHeaders(event)
    const token = headers?.authorization?.split(' ')[1]
    const verifiedToken = verifyToken(token)
    if (!verifiedToken.error) {
        const file =  await db().collection('files').insertOne({
            user_id: verifiedToken.data.user_id,
            file_name: body.file_name,
            size: body.size,
            type: body.type,
        })

        if (file.acknowledged) {
            const fileSaved = await saveBase64ToFile(file.insertedId.toString(), body.file_base64)

            if (fileSaved.success) {

                const updatedFile = await db().collection('files').updateOne({
                    _id: file.insertedId,
                    },
                    {
                        $set: {
                            url: file.insertedId.toString()
                        }
                    })

                if (updatedFile.acknowledged) {
                    setResponseStatus(event, 200)
                    return {
                        statusCode: 200
                    }
                }
            } else {
                return {
                    statusCode: 500,
                    error: 'error in saving file',
                }
            }
        }
    } else {
        setResponseStatus(event, 401)
        return {
            statusCode: 401,
            error: 'unauthorized',
        }
    }
})