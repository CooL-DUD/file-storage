import { faker } from '@faker-js/faker';
import {MongoClient} from "mongodb";
import {storeInBlockchain} from "./seeder_utils/storeInBlockchain.js";


function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

async function seedDB() {
    // Connection URL
    const uri = "mongodb+srv://server:34axbm68@diploma.pmpdkpl.mongodb.net/";

    const client = new MongoClient(uri);
    const availableFiles = [
        {
            from_seeder: true, file_name: "hand_pointing_up_b2c.png",
            size: 133079,
            type: "image/png",
            uploaded_date: "2024-06-03T14:56:27.377Z",
            url: "665dd99cb5fc1d38e4236cdf.png"
        },
        {
            from_seeder: true, file_name: "hand_pointing_up_green_star.png",
            size: 75502,
            type: "image/png",
            uploaded_date: "2024-06-03T14:56:27.378Z",
            url: "665dd99db5fc1d38e4236ce0.png"
        },
        {
            from_seeder: true, file_name: "map_bg.png",
            size: 1581869,
            type: "image/png",
            uploaded_date: "2024-06-03T15:12:11.534Z",
            url: "665ddd4be374780917a94014.png"
        },
        {
            from_seeder: true, file_name: "map-kaz.png",
            size: 77494,
            type: "image/png",
            uploaded_date: "2024-06-03T15:12:26.471Z",
            url: "665ddd5ae374780917a94015.png"
        },
        {
            from_seeder: true, file_name: "bookmarks_1_12_24.html",
            size: 16707,
            type: "text/html",
            uploaded_date: "2024-06-04T06:31:21.425Z",
            url: "665eb4b9b5fc1d38e4236ce1.html"
        },
        {
            from_seeder: true, file_name: "Screenshot 2024-06-01 at 15.45.42.png",
            size: 207750,
            type: "image/png",
            uploaded_date: "2024-06-05T09:48:32.914Z",
            url: "66603473b5fc1d38e4236ce2.png"
        },
        {
            from_seeder: true, file_name: "ContactUs.txt",
            size: 276,
            type: "text/plain",
            uploaded_date: "2024-06-05T09:49:28.980Z",
            url: "666034a9b5fc1d38e4236ce3.txt"
        },
        {
            from_seeder: true, file_name: "ContactUs (1).txt",
            size: 276,
            type: "text/plain",
            uploaded_date: "2024-06-05T09:49:28.979Z",
            url: "666034a9b5fc1d38e4236ce4.txt"
        },
        {
            from_seeder: true, file_name: "coursera cs 3 (1).pdf",
            size: 324103,
            type: "application/pdf",
            uploaded_date: "2024-06-05T09:49:28.982Z",
            url: "666034aab5fc1d38e4236ce5.pdf"
        },
        {
            from_seeder: true, file_name: "coursera cs 2.pdf",
            size: 323851,
            type: "application/pdf",
            uploaded_date: "2024-06-05T09:49:28.982Z",
            url: "666034abb5fc1d38e4236ce6.pdf"
        },
        {
            from_seeder: true, file_name: "coursera cs 4.pdf",
            size: 324136,
            type: "application/pdf",
            uploaded_date: "2024-06-05T09:49:28.983Z",
            url: "666034abb5fc1d38e4236ce7.pdf"
        },
        {
            from_seeder: true, file_name: "coursera cs 1.pdf",
            size: 324154,
            type: "application/pdf",
            uploaded_date: "2024-06-05T09:49:28.981Z",
            url: "666034adb5fc1d38e4236ce8.pdf"
        },
        {
            from_seeder: true, file_name: "coursera cs 1 (1).pdf",
            size: 324154,
            type: "application/pdf",
            uploaded_date: "2024-06-05T09:49:28.980Z",
            url: "666034aeb5fc1d38e4236ce9.pdf"
        },
        {
            from_seeder: true, file_name: "coursera cs 3.pdf",
            size: 324103,
            type: "application/pdf",
            uploaded_date: "2024-06-05T09:49:28.983Z",
            url: "666034aeb5fc1d38e4236cea.pdf"
        },
        {
            from_seeder: true, file_name: "coursera cs 2 (1).pdf",
            size: 323851,
            type: "application/pdf",
            uploaded_date: "2024-06-05T09:49:28.981Z",
            url: "666034afb5fc1d38e4236ceb.pdf"
        }
    ]

    try {
        await client.connect();
        console.log("Connected correctly to server");

        const users = client.db("fs").collection("users");

        // make a bunch of time series data
        let usersSeederData = [];

        for (let i = 0; i < 1; i++) {
            const userData = {
                    email: faker.internet.email().toLowerCase(),
                    first_name: faker.person.firstName(),
                    last_name: faker.person.lastName(),
                    password: '$2b$10$R2po8X/HW0y/7FK.ax7mk.A5rng3zy/HzowB4/hIYsulNDBUh1cl2',
                    role: 'user',
            }

            const user = {
                blockchain: [
                    storeInBlockchain(userData, '0')
                ],
                actions: [
                    {
                        time: new Date().toISOString(),
                        name: 'register'
                    }
                ],
                refresh: '',
                token: '',
            }

            usersSeederData.push(user)
        }
        const data = await users.insertMany(usersSeederData);
        const files = []

        const lastFile = await client.db("fs").collection('files').findOne({}, { sort: { _id: -1 } })
        let lastFileHash = lastFile?.hash || '0'

        for (const key in data.insertedIds) {
            let userFiles = getRandomElements(availableFiles, 1)

            userFiles.forEach(file => {
                file = storeInBlockchain({user_id: data.insertedIds[key].toString(), ...file}, lastFileHash)
                files.push(file)
                lastFileHash = file.hash
            })
        }
        console.log(files)

        await client.db("fs").collection('files').insertMany(files)

        console.log("Database seeded with synthetic data! :)");
    } catch (err) {
        console.log(err.stack);
    }
}

seedDB();

function getRandomElements(arr, num) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}