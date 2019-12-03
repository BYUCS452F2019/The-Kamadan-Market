import { getDBConnection } from './mongoConnection'

module.exports.createPost = async (postInfo) => {
    let connection = await getDBConnection()
    let db = connection["db"]
    let resp
    if(Array.isArray(postInfo)) {
        resp = await db.collection("Posts").insertMany(postInfo).catch((err) => {
            console.error(err)
        })
    }else{
        resp = await db.collection("Posts").insertOne(postInfo).catch((err) => {
            console.error(err)
        })
    }
    connection["client"].close()
    return resp.ops.length == 1 ? resp.ops[0] : resp.ops
}