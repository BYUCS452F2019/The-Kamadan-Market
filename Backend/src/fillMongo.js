import fs, { exists } from 'fs'
import csv from 'csv-parser'
import { getDBConnection } from './mongoConnection'
import randomName from 'random-name'
import usersDB from './mongoUsers'

let clearDatabase = async (db) => {
    console.log('Clearing DB')
    await db.collection("Users").drop().catch((err) => {
        //ignore. this is an error when the collection doesn't exist yet
    })
    await db.collection("Posts").drop().catch((err) => {
        //ignore. this is an error when the collection doesn't exist yet
    })
    console.log('DB Cleared')
    return;
}

let generateUsers = async () => {
    console.log("Generating Users")
    let users = []
    for(let i = 0; i < 1000; i++) {
        let last = randomName.last()
        let first = randomName.first()
        let user = {
            gamertag: last + 'anator' + i,
            firstName: first,
            lastName: last,
            email: first + '.' + last + i + '@gmail.com',
            password: 'madeupPassword'
        }
        users.push(user)
    }
    users = await usersDB.createUser(users)
    console.log("Users Generated")
    return users
}

let generatePosts = async (users) => {
    let posts = []
    for(let i = 0; i < 10000; i++) {
        let randItem = getRndInteger(0, items.length - 1)
        let randUser = getRndInteger(0, userIDs.length - 1)
        let isSelling = getRndInteger(0,1) == 0
        let newPost = {
            userID: userIDs[randUser],
            itemID: items[randItem].itemID,
            goldCost: getRndInteger(1,100000),
            postText: (isSelling ? "WTS" : "WTB") + ' ' + items[randItem].itemName,
            active: true,
            isSelling
        }
        posts.push(newPost)
    }
    // add to DB
}

let fillDatabase = () => {
    let items = {}
    fs.createReadStream('items.csv').pipe(csv()).on('data', (row) => {
        if(row['0'] && !row['0'].includes("\"" && !row['0'] == "" && !row['0'])){
            if(Object.keys(row).length == 2){
                items[row['0']] = row['1']
            }
        }
    }).on('end', async () => {
        // convert items to an array of { itemType: ..., itemName: ... }
        items = Object.keys(items).map((itemName) => {
            return {
                itemName,
                itemType: items[itemName]
            }
        })
        let connection = await getDBConnection()
        await clearDatabase(connection["db"])
        let users = await generateUsers()
        await generatePosts(users)
        console.log('Database initialization complete')
        connection["client"].close()
        process.exit(0)
    })
}

try{
    //exportFunc()
    fillDatabase()
}catch(err){
    console.error(err.message)
}