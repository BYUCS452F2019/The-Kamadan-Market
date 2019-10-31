import axios from 'axios'
import fs, { exists } from 'fs'
import dbUtils from './dbUtils'
import csv from 'csv-parser'
import itemsDB from './items'
import randomName from 'random-name'
import usersDB from './users'
import postsDB from './posts'

let baseURL = 'https://api.guildwars2.com/v2'

function getRndInteger(min, max) {
    return Math.round(Math.random() * (max - min) ) + min;
}

let clearDatabase = async () => {
    console.log('Clearing DB')
    await dbUtils.clearDB()
    console.log('DB Cleared')
    return;
}

let generateRandomUsers = async () => {
    console.log('Generating random users')
    let userIDs = []
    for(let i = 0; i < 1000; i++) {
        let last = randomName.last()
        let first = randomName.first()
        let newUserID = await usersDB.createUser({
            gamertag: last + 'anator' + i,
            firstName: first,
            lastName: last,
            email: first + '.' + last + i + '@gmail.com',
            password: 'madeupPassword'
        })
        userIDs.push(newUserID)
    }
    console.log('Users generated')
    return userIDs
}

let defineItems = async (items) => {
    console.log('Defining Items. This may take a while.')
    let newItems = []
    for(let i = 0; i < items.length; i++){
        let result = await itemsDB.defineItem(items[i].itemName, items[i].itemTypeID)
        newItems.push({
            ...items[i],
            itemID: result[0]
        })
    }
    console.log('Items Defined')
    return newItems
}

let defineItemTypes = async (items) => {
    console.log('Defining Item Types')
    let itemTypeIDs = {} // keyed with typeName to typeID in the DB
    let uniqueTypeNames = Array.from(new Set(items.map((item) => {return item.itemType})))
    for(let i = 0; i < uniqueTypeNames.length; i++){
        let result = await itemsDB.defineItemType(uniqueTypeNames[i])
        itemTypeIDs[uniqueTypeNames[i]] = result[0] // store the type name to its ID
    }
    console.log('Item types defined')
    // save the itemType id with the item
    return items.map((item) => {
        return {
            ...item,
            itemTypeID: itemTypeIDs[item.itemType]
        }
    })
}

let generateBarter = async (post, items, groupNum) => {
    let randomItem = getRndInteger(0, items.length - 1)
    while(items[randomItem].itemID == post.itemID) { // make sure they're not trading for the same item
        randomItem = getRndInteger(0, items.length - 1)
    }
    await postsDB.newBarter({
        postID: post.postID,
        itemID: items[randomItem].itemID,
        askingNum: getRndInteger(1,5),
        groupNum: groupNum
    })
}

let generatePostBarterOptions = async (posts, items) => {
    console.log('Generating barter options for already created posts')
    for(let i = 0; i < posts.length; i++){
        let numBarters = getRndInteger(0,3)
        for(let j = 0; j < numBarters; j++) {
            await generateBarter(posts[i], items, j)
            //randomly group this barter with another barter in the same groupNum
            if(getRndInteger(0,15) == 0){
                await generateBarter(posts[i], items, j)
            }
        }
    }
    console.log('Barter options generated')
}

let generateRandomPosts = async (items, userIDs) => {
    console.log('Generating random posts')
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
        let postID = await postsDB.newPost(newPost)
        posts.push({
            ...newPost,
            postID
        })
    }
    console.log('Posts generated')
    return posts
}

let getItemIDs = async () => {
    let response = await axios.get(baseURL + '/items')
    if(response.err) { console.error(err); throw Error('Error in getItemIDs!!!'); }
    return response.data
}

let timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

let buildBatches = (itemIDs) => {
    let URLs = []
    for(let i = 0; i < itemIDs.length; i+=50){
        URLs.push(baseURL + '/items?ids=' + itemIDs.slice(i, i+100).join())
    }

    let batches = []
    let batchSize = 100
    for(let i = 0, j = URLs.length; i < j; i+=batchSize){
        batches.push(URLs.slice(i, i + batchSize))
    }
    return batches
}

let asyncAxios = async (url) => {
    return (await axios.get(url)).data
}

let exportFunc = async () => {
    console.log('Retrieving all item IDs')
    let itemIDs = await getItemIDs()
    let items = []
    console.log('Separating requests into batches for parallelization')
    let batches = buildBatches(itemIDs)
    console.log('Querying for individual item information')
    for(let i = 0; i < batches.length; i++){
        console.log('Retrieving batch ' + i)
        try{
            let batchResults = await Promise.all(batches[i].map(async (url) => {
                return (await asyncAxios(url))
            }))
            batchResults.forEach(itemsList => {
                items.push(...itemsList)
            })
        }catch(e){
            console.error(e.message)
            return;
        }
        if(i != batches.length - 1) {
            console.log('Preventing API throttling by waiting')
            await timeout(20000)
        }
    }

    // now we can export the data to a csv file.
    let toSave = []
    for(let i = 0; i < items.length; i++) {
        toSave.push([
            items[i].name + ',' + items[i].type + '\n'
        ])
    }
    toSave = toSave.join('')
    fs.writeFile('items.csv', toSave, 'utf8', function (err) {
        if (err) {
          console.log('Some error occured - file either not saved or corrupted file saved.');
        } else{
          console.log('File save complete.');
        }
      });
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
        await clearDatabase()
        items = await defineItemTypes(items)
        items = await defineItems(items)
        let userIDs = await generateRandomUsers()
        let posts = await generateRandomPosts(items, userIDs)
        await generatePostBarterOptions(posts, items)
        console.log('Database initialization complete')
        process.exit(0)
    })
}

try{
    //exportFunc()
    fillDatabase()
}catch(err){
    console.error(err.message)
}
