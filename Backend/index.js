import express from 'express';
import connector from 'knex';
import Ajv from 'ajv'; // checks and validates requests
import bodyParser from 'body-parser';

const ajv = new Ajv();

let knex = connector({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : process.env.DB_PASSWORD,
      bodybase : 'kamadan-market'
    }
});

// This is just temporary until we get the DB set up
let users = {}
let gamertags = new Set();

knex.raw('SELECT VERSION()')
    .then(version => console.log(version[0][0]))
    .catch(err => console.log(err));

const app = express();

app.use(bodyParser.json());

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

const validateRegisterRequest = (req, res, next) => {

    const valid = validateRegister(req.body);
    
    if (!valid) {
        res.status(400).send(validateRegister.errors.message);
    } else if (users[req.body.email]) {
        res.status(400).send('Email already registered');   
    } else if (gamertags.has(req.body.gamertag)) {
        res.status(400).send('Gamertag taken'); 
    }

    next();
};

const insertUser = (req, res) => {
    let user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gamertag: req.body.gamertag,
        email: req.body.email,
        password: req.body.password
    }
    users[user.email] = user;
    gamertags.add(user.gamertag);
    res.status(200).send(user);
}

app.post('/api/register', [validateRegisterRequest, insertUser]);

app.listen(8080, () =>
    console.log(`Example app listening on port 8080!`),
);