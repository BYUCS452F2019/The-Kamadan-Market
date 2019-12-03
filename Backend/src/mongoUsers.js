import { getDBConnection } from './mongoConnection'

module.exports.createUser = async (userInfo) => {
    let connection = await getDBConnection()
    let db = connection["db"]
    let resp
    if(Array.isArray(userInfo)) {
        resp = await db.collection("Users").insertMany(userInfo).catch((err) => {
            console.error(err)
        })
    }else{
        resp = await db.collection("Users").insertOne(userInfo).catch((err) => {
            console.error(err)
        })
    }
    connection["client"].close()
    return resp.ops.length == 1 ? resp.ops[0] : resp.ops
}