import Ajv from 'ajv';
import knex from './connection';

const ajv = new Ajv();

module.exports.getItems = (req, res) => {
    res.status(200).send([]);
};