import { getDBConnection } from './mongoConnection'
import { ObjectID } from 'mongodb'

let addLowerItemName =  (post) => {
    post.itemNameLower = post.item.itemName.toLowerCase()
}

module.exports.getPosts = async (keyWord = "") => {
    let connection = await getDBConnection()
    let db = connection["db"]
    let reg = new RegExp("%" + keyWord ? keyWord.toLowerCase() : "" + "%")
    let resp = await db.collection("Posts").find({
        itemNameLower: reg
    }, {
        sort: [["_id", "desc"]]
    }).toArray()
    for(let i = 0; i < resp.length; i++){
        resp[i].time = (new ObjectID(resp[i]._id)).getTimestamp()
    }
    connection["client"].close()
    console.log(resp)
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

module.exports.getUserPosts = async (userID) => {
    let connection = await getDBConnection()
    let db = connection["db"]
    let resp = await db.collection("Posts").find({
        "user.userID": new ObjectID(userID)
    }, {
        sort: [["_id", "desc"]]
    }).toArray()
    connection["client"].close()
    return resp
}

module.exports.deletePost = async (postID) => {
    let connection = await getDBConnection()
    let db = connection["db"]
    let resp = await db.collection("Posts").deleteOne({
        "_id": new ObjectID(postID)
    })
    connection["client"].close()
    return resp
}