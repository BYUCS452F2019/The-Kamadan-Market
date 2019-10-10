import express from 'express';
import connector from 'knex';
let knex = connector({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : process.env.DB_PASSWORD,
      database : 'kamadan-market'
    }
});

knex.raw('SELECT VERSION()')
    .then(version => console.log(version[0][0]))
    .catch(err => console.log(err))

const app = express()

app.get('/', (req, res) => {
    return res.send('Received a GET HTTP method');
  });
app.post('/', (req, res) => {
    return res.send('Received a POST HTTP method');
});
app.put('/', (req, res) => {
    return res.send('Received a PUT HTTP method');
});
app.delete('/', (req, res) => {
    return res.send('Received a DELETE HTTP method');
});
app.listen(8080, () =>
    console.log(`Example app listening on port 8080!`),
);