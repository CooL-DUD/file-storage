// import {generateRefresh, generateToken, verifyToken} from "~/server/utils/token";
//
// export default defineEventHandler(async (event) => {
//     const body = await readBody(event)
//
//     const refreshExpired = verifyToken(body.refresh)
//     if (refreshExpired.error) {
//
//     }
//     const tokenParams ={
//         user_id: user._id,
//         email: user.email,
//         role: user.role
//     }
//     const token = generateToken(tokenParams);
//     if (refreshExpired.error) {
//         user.refresh = generateRefresh(tokenParams);
//     }
//     setResponseStatus(event, 200)
//     return {
//         data: {
//             token: token,
//             refresh: user.refresh
//         },
//         status: 200
//     }
// })