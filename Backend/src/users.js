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

const isEmailAvailable = (email) => {
    let available;
    knex('Users').select('*')
        .where({email})
        .then(rows => {
            available = !rows.length;
        });
    return available;
};

const isGamertagAvailable = (gamertag) => {
    let available;
    knex('Users').select('*')
        .where({email})
        .then(rows => {
            available = !rows.length;
        });
    return available;
};

module.exports.validateRegisterRequest = (req, res, next) => {

    const valid = validateRegister(req.body);
    
    if (!valid) {
        res.status(400).send(validateRegister.errors.message);
    } else if (!isEmailAvailable(req.body.email)) {
        res.status(400).send('Email already registered');   
    } else if (!isGamertagAvailable(req.body.gamertag)) {
        res.status(400).send('Gamertag taken'); 
    } else {
        next();
    }
};

module.exports.insertUser = (req, res) => {
    let user;
    knex('Users')
        .insert(req.body)
        .then(result => {
            knex('Users')
                .select('userID', 'gamertag', 'firstName', 'lastName', 'email')
                .where({email: req.body.email})
                .then(rows => {
                    user = rows[0];
                });
    });

    
    res.status(200).send(user);
};

module.exports.getUser = (req, res) => {
    res.status(200).send({})
}