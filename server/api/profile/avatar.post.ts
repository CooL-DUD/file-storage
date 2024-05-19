import { ObjectId } from "mongodb";
import {saveAvatar} from "~/server/utils/saveAvatar";
import {getFileExtensionFromBase64} from "~/server/utils/getFileExtension";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const headers = await getRequestHeaders(event)
    const token = headers?.authorization?.split(' ')[1]
    const verifiedToken = verifyToken(token)
    const url = 'http://localhost:3000/storage/avatars/';
    if (!verifiedToken.error) {
        const avatarExtension = getFileExtensionFromBase64(body.avatar)
        const avatarName = verifiedToken.data.user_id.toString() + '.' + avatarExtension
        const avatarSaved = await saveAvatar(avatarName, body.avatar)
        if (avatarSaved.success) {
            await db().collection('users').updateOne({_id: new ObjectId(verifiedToken.data.user_id)}, {
                $set: {
                    'data.avatar': url + avatarName,
                }
            })
            setResponseStatus(200)
            return {
                statusCode: 200,
                data: avatarSaved,
                url
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