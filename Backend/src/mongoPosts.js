import { getDBConnection } from './mongoConnection'

let addLowerItemName =  (post) => {
    post.itemNameLower = post.item.itemName.toLowerCase()
}

module.exports.getPosts = async (keyWord) => {
    let connection = await getDBConnection()
    let db = connection["db"]
    let reg = new RegExp("%" + keyWord ? keyWord.toLowerCase() : "" + "%")
    console.log(reg)
    let resp = await db.collection("Posts").find({
        itemNameLower: reg
    }, {
        sort: [["_id", "desc"]]
    }).toArray()
    connection["client"].close()
    return resp
}

module.exports.createPost = async (postInfo) => {
    let connection = await getDBConnection()
    let db = connection["db"]
    let resp
    if(Array.isArray(postInfo)) {
        for(let i = 0; i < postInfo.length; i++){
            addLowerItemName(postInfo[i])
        }
        resp = await db.collection("Posts").insertMany(postInfo).catch((err) => {
            console.error(err)
        })
    }else{
        addLowerItemName(postInfo)
        resp = await db.collection("Posts").insertOne(postInfo).catch((err) => {
            console.error(err)
        })
    }
    connection["client"].close()
    return resp.ops.length == 1 ? resp.ops[0] : resp.ops
}