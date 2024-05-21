import {saveBase64ToFile} from "~/server/utils/saveFiles";
import {readBlock} from "~/server/utils/readBlock";
import {storeInBlockchain} from "~/server/utils/storeInBlockchain";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const headers = await getRequestHeaders(event)
    const token = headers?.authorization?.split(' ')[1]
    const verifiedToken = verifyToken(token)
    if (!verifiedToken.error) {
        const lastFile = await db().collection('files').findOne({}, { sort: { _id: -1 } })
        const file =  await db().collection('files').insertOne(storeInBlockchain({
            user_id: verifiedToken.data.user_id,
            file_name: body.file_name,
            size: body.size,
            type: body.type,
            uploaded_date: body.uploaded_date
        }, lastFile?.hash || 0))

        const splittedFilename = body?.file_name?.split('.')
        const fileUrl = file.insertedId.toString() + '.' + splittedFilename[splittedFilename.length - 1]

        if (file.acknowledged) {
            const fileSaved = await saveBase64ToFile(fileUrl, body.file_base64)

            if (fileSaved.success) {
                const updatedFile = await db().collection('files').updateOne({
                    _id: file.insertedId,
                    },
                    {
                        $set: {
                            'data.url': fileUrl
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