import { ObjectId } from "mongodb";
import {saveAvatar} from "~/server/utils/saveAvatar";
import {getFileExtensionFromBase64} from "~/server/utils/getFileExtension";
import {db} from "~/server/utils/db";

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
            const user = await db().collection('users').findOne({_id: new ObjectId(verifiedToken.data.user_id)})
            await db().collection('users').updateOne({_id: new ObjectId(verifiedToken.data.user_id)}, {
                $push: {
                    // blockchain: url + avatarName,
                    blockchain: {
                        ...user.blockchain[user.blockchain.length - 1],
                        data: {
                            ...user.blockchain[user.blockchain.length - 1].data,
                            avatar: url + avatarName,
                        },
                    },
                }
            })
            await db().collection("users").findOneAndUpdate(
                {
                    _id: new ObjectId(verifiedToken.data.user_id),
                },
                {
                    $push: {
                        actions: {
                            time: new Date().toISOString(),
                            name: 'avatar',
                        }
                    }
                }
            )
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