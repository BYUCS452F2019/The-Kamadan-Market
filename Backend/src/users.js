import Ajv from 'ajv';
import knex from './connection';

const ajv = new Ajv();

const validateRegister = ajv.compile({
    additionalProperties: false,
    type: 'object',
    properties: {
        firstName: {
            type: 'string'
        },
        lastName: {
            type: 'string'
        },
        gamertag: {
            type: 'string'
        },
        email: {
            type: 'string',
            format: 'email'
        },
        password: {
            type: 'string'
        }
    }
});

const isEmailAvailable = async (email) => {
    let rows = await knex('Users').select('*')
                        .where({email});
    
    return !rows.length;
};

const isGamertagAvailable = async (gamertag) => {
    let rows = await knex('Users').select('*')
                        .where({gamertag});
    
    return !rows.length;
};

module.exports.validateRegisterRequest = async (req, res, next) => {

    const valid = validateRegister(req.body);
    if (!valid) {
        res.status(400).send(validateRegister.errors.message);
    } else if (! await isEmailAvailable(req.body.email)) {
        res.status(400).send('Email already registered');   
    } else if (! await isGamertagAvailable(req.body.gamertag)) {
        res.status(400).send('Gamertag taken'); 
    } else {
        next();
    }
};

module.exports.insertUser = async (req, res) => {
    let insertRows = await knex('Users').insert(req.body);
    console.log(insertRows);
    let selectRows = await knex('Users')
                            .select('userID', 'gamertag', 'firstName', 'lastName', 'email')
                            .where({email: req.body.email});
    
    res.status(200).send(selectRows[0]);
};

module.exports.getUser = (req, res) => {
    res.status(200).send({})
}