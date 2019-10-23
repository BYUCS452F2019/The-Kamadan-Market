import knexConfig from './knexfile';
import connector from 'knex';

const knex = connector(knexConfig.development);

knex.raw('SELECT VERSION()')
    .then(version => console.log('Successfully connected to DB'))
    .catch(err => console.log(err));

export default knex;