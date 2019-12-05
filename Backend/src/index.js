import express from 'express';
import bodyParser from 'body-parser';
import mongoUsers from './mongoUsers';
import mongoPosts from './mongoPosts';
import posts from './posts';
import items from './items';
import cors from 'cors';

const app = express();

app.use([bodyParser.json(), cors()]);

app.post('/api/users/', async (req, res) => {
    let user = await mongoUsers.createUser(req.body);
    res.status(200).send(user);
});

app.post('/api/users/login/', async (req, res) => {
    let {email, password} = req.body;
    try {
        let user = await mongoUsers.loginUser(email, password);
        res.status(200).send(user);
    } catch (ex) {
        res.status(404).send({errorMessage: 'No user found'});
    }
});

// app.get('/api/users/:id', [users.getUser]);

app.get('/api/posts/:userID', [posts.getUserPosts])

app.get('/api/posts', async (req, res) => {
    let keyword = req.query.keyWords || '';
    let posts = await mongoPosts.getPosts(keyword);
    res.status(200).send(posts.slice(0, 20)); // only send 20
});

app.post('/api/posts', async (req, res) => {
    await mongoPosts.createPost(req.body);
    res.send(200);
});

app.delete('/api/posts/:postID', [posts.deletePost])

// app.put('/api/posts/:postID', [posts.updatePost])

app.get('/api/items', [items.getItems]);

app.listen(8080, () =>
    console.log(`Application listening on port 8080`),
);