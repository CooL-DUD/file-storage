import {connectDB} from "~/server/utils/db";

export default defineNitroPlugin(async (nitroApp) => {
    await connectDB()
})