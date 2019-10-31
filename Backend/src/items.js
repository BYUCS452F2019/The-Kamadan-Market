import Ajv from 'ajv';
import knex from './connection';

const ajv = new Ajv();

module.exports.getItems = async (req, res) => {
    let response = await knex('Items').select('*')
    res.status(200).send(response);
};

module.exports.defineItemType = async (typeName) => {
    return await knex('ItemType').insert({
        typeName
    })
}

module.exports.defineItem = async (itemName, typeID) => {
    return await knex('Items').insert({
        itemName,
        typeID
    })
}