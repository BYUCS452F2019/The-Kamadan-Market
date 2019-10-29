import Ajv from 'ajv';
import knex from './connection';

const ajv = new Ajv();

const validateRegister = ajv.compile({
    additionalProperties: false,
    type: 'object',
    required: ['firstName', 'lastName', 'gamertag', 'email', 'password'],
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

const validateLogin = ajv.compile({
    additionalProperties: false,
    type: 'object',
    required: ['email', 'password'],
    properties: {
        email: {
            type: 'string',
            format: 'email'
        },
        password: {
            type: 'string'
        }
    }
})

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
        return res.status(400).json('Please enter a valid email');
    } else if (! await isEmailAvailable(req.body.email)) {
        return res.status(400).json('Email already registered');   
    } else if (! await isGamertagAvailable(req.body.gamertag)) {
        return res.status(400).json('Gamertag taken'); 
    } else {
        next();
    }
};

module.exports.insertUser = async (req, res) => {
    await knex('Users').insert(req.body);
    let selectRows = await knex('Users')
                            .select('userID', 'gamertag', 'firstName', 'lastName', 'email')
                            .where({email: req.body.email});
    
    res.status(200).json(selectRows[0]);
};

module.exports.validateLoginRequest = (req, res, next) => {
    let valid = validateLogin(req.body);
    if (!valid) {
        return res.status(400).json('Please enter a valid email');
    }
    next();
};

module.exports.loginUser = async (req, res) => {
    const rows = await knex('Users')
                            .select('userID', 'gamertag', 'firstName', 'lastName', 'email')
                            .where({
                                email: req.body.email,
                                password: req.body.password
                            });
    if (!rows.length) {
        return res.status(401).json('Invalid email or password');
    } else {
        return res.status(200).send(rows[0]);
    }
};

module.exports.getUser = (req, res) => {
    knex.from('users')
        .select('userID', 'gamertag', 'firstName', 'lastName', 'email')
        .where('userID', req.params.id)
        .then((userArr) => {
            if(userArr.length < 1) {
                return res.status(400).send('User does not exist!')
            }
            return res.status(200).send(userArr[0])
        })
        .catch((err) => {
            return res.status(400).send(err)
        })
}