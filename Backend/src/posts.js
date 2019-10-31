import Ajv from 'ajv';
import knex from './connection';

const ajv = new Ajv();

const validateCreate = ajv.compile({
    additionalProperties: false,
    type: 'object',
    required: ['userID', 'itemID', 'postText', 'goldCost', 'isSelling'],
    properties: {
        userID: {
            type: 'string'
        },
        itemID: {
            type: 'string'
        },
        postText: {
            type: 'string'
        },
        goldCost: {
            type: 'integer'
        },
        isSelling: {
            type: 'boolean'
        }
    }
});

module.exports.validateCreatePost = (req, res, next) => {
    const valid = validateCreate(req.body);
    if (!valid) {
        res.status(400).send(validateCreate.errors.message);
    } 
    else {
        next();
    }
}

module.exports.getPosts = (req, res) => {
    if(req.query && req.query.keyWords && req.query.keyWords != '') { // Get 20 specific posts
        knex.from('Posts')
        .select('*')
        .orderBy('time')
        .offset(0)
        .limit(20)
        .where('Items.itemName', 'like', '%' + req.query.keyWords + '%')
        .join('Users', 'Users.userID', '=', 'Posts.userID')
        .join('Items', 'Items.itemID', '=', 'Posts.itemID')
        .join('ItemType', 'ItemType.typeID', '=', 'Items.typeID')
        .then((posts) => {
            return res.status(200).send(posts)
        })
        .catch((err) => {
            return res.status(400).send(err)
        })
    }
    else { // Get the top 20 most recent
        knex.from('Posts')
            .select('*')
            .orderBy('time')
            .offset(0)
            .limit(20)
            .join('Users', 'Users.userID', '=', 'Posts.userID')
            .join('Items', 'Items.itemID', '=', 'Posts.itemID')
            .join('ItemType', 'ItemType.typeID', '=', 'Items.typeID')
            .then((posts) => {
                return res.status(200).send(posts)
            })
            .catch((err) => {
                return res.status(400).send(err)
            })
    }
}

let newPost = async (postInfo) => {
    let results = await knex('Posts').insert(postInfo)
    return results[0]
}

module.exports.createPost = async (req, res) => {
    if(!req.body) {
        res.status(400).send('ERROR. No attributes provided')
    }
    const { userID, postText, itemID, goldCost, isSelling } = req.body
    if(userID && postText && itemID && goldCost && isSelling != null) {
        await newPost({
            ...(req.body),
            active: true
        })
        res.status(200).send()
    }else{
        res.status(400).send('Missing attributes!')
    }
}

module.exports.newPost = newPost

module.exports.newBarter = async (barterInfo) => {
    let results = await knex('BarterOptions').insert(barterInfo)
    return results[0]
}

module.exports.getUserPosts = async (req, res) => {
    let responses = await knex('Posts')
                            .select('*')
                            .orderBy('time')
                            .offset(0)
                            .limit(20)
                            .where('Users.userID', '=', req.params.userID)
                            .join('Users', 'Users.userID', '=', 'Posts.userID')
                            .join('Items', 'Items.itemID', '=', 'Posts.itemID')
                            .join('ItemType', 'ItemType.typeID', '=', 'Items.typeID')
    res.status(200).send(responses)
}

module.exports.deletePost = async (req, res) => {
    await knex('Posts').where({postID: req.params.postID}).del()
    res.status(200).send()
}

module.exports.updatePost = async (req, res) => {
    await knex('Posts').where({postID: req.params.postID}).update(req.body)
    res.status(200).send()
}