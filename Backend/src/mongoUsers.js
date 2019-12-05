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
};

module.exports.loginUser = async (email, password) => {
    let connection = await getDBConnection();
    let db = connection["db"];
    let resp = await db.collection("Users").find({
        email,
        password
    }).toArray();
    connection["client"].close();
    if (resp.length === 1) {
        return resp[0];
    } else {
        throw new Error('User not found');
    }
};