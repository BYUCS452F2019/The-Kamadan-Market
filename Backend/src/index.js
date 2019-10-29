import express from 'express';
import bodyParser from 'body-parser';
import users from './users';
import posts from './posts';
import items from './items';

const app = express();

app.use(bodyParser.json());

app.post('/api/users/', [users.validateRegisterRequest, users.insertUser]);

app.post('/api/users/login/', [users.validateLoginRequest, users.loginUser])

app.get('/api/users/:id', [users.getUser]);

app.get('/api/posts', [posts.getPosts]);

app.post('/api/posts', [posts.validateCreatePost, posts.createPost]);

app.get('/api/items', [items.getItems]);

app.listen(8080, () =>
    console.log(`Application listening on port 8080`),
);