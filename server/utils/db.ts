import {MongoClient} from "mongodb";

const client = new MongoClient('mongodb+srv://ganinurgazy03:ganinurgazy03@diploma.pmpdkpl.mongodb.net/')
let users2
export async function connectDB() {
    try {
        await client.connect();
        console.log('connected to mongoDB');
        await client.db('fs').createCollection('users')

        const users = await client.db('fs').collection('users').find().toArray();

        users2 = users
    } catch (e) {
        console.error(e);
    }
}

export function db() {
    return client.db('fs')
    // return users2
}