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
    console.log(req.body, valid)
    console.log(req.query)
    if (!valid) {
        res.status(400).send(validateCreate.errors.message);
    } 
    else {
        next();
    }
}

module.exports.getPosts = (req, res) => {
    res.status(200).send([])
}

module.exports.createPost = (req, res) => {
    res.status(200).send({})
}