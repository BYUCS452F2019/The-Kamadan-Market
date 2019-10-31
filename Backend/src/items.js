import Ajv from 'ajv';
import knex from './connection';

const ajv = new Ajv();

module.exports.getItems = async (req, res) => {
    if(req.query && req.query.keyWords && req.query.keyWords != '') {
        let response = await knex('Items').select('*').where('Items.itemName', 'like', '%' + req.query.keyWords + '%')
        res.status(200).send(response);
    }else {
        let response = await knex('Items').select('*').limit(100)
        res.status(200).send(response);
    }
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