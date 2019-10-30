import axios from 'axios'
import fs, { exists } from 'fs'
import util from 'util'

let baseURL = 'https://api.guildwars2.com/v2'

let clearDatabase = () => {
    
}

let generateRandomUsers = () => {

}

let defineItems = () => {

}

let defineItemTypes = () => {

}

let generatePostBarterOptions = (post) => {

}

let generateRandomPosts = () => {

}

let makeItemRequest = async (id) => {
    let response = await axios.get(baseURL + '/items/' + id)
    if(response.err) { console.error(err); throw Error('Error in make Request!!!'); }
    return response.data
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

try{
    exportFunc()
}catch(err){
    console.error(err.message)
}
