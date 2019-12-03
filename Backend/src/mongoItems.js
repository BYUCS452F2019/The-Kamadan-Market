import { getDBConnection } from './mongoConnection'

module.exports.defineItem = async (itemInfo) => {
    let connection = await getDBConnection()
    let db = connection["db"]
    let resp
    if(Array.isArray(itemInfo)) {
        resp = await db.collection("Items").insertMany(itemInfo).catch((err) => {
            console.error(err)
        })
    }else{
        resp = await db.collection("Items").insertOne(itemInfo).catch((err) => {
            console.error(err)
        })
    }
    connection["client"].close()
    return resp.ops.length == 1 ? resp.ops[0] : resp.ops
}