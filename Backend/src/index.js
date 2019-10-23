import express from 'express';
import bodyParser from 'body-parser';
import users from './users';

const app = express();

app.use(bodyParser.json());

app.post('/api/users/', [users.validateRegisterRequest, users.insertUser]);

app.listen(8080, () =>
    console.log(`Example app listening on port 8080!`),
);