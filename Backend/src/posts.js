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
        
    }
    else { // Get the top 20 most recent
        knex.from('Posts')
            .select('*')
            .orderBy('time')
            .offset(0)
            .limit(20)
            .then((posts) => {
                return res.status(200).send(posts)
            })
            .catch((err) => {
                return res.status(400).send(err)
            })

    }
}

module.exports.createPost = (req, res) => {
    res.status(200).send({})
}

module.exports.newPost = async (postInfo) => {
    let results = await knex('Posts').insert(postInfo)
    return results[0]
}

module.exports.newBarter = async (barterInfo) => {
    let results = await knex('BarterOptions').insert(barterInfo)
    return results[0]
}