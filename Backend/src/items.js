import Ajv from 'ajv';
import knex from './connection';

const ajv = new Ajv();

module.exports.getItems = (req, res) => {
    res.status(200).send([]);
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