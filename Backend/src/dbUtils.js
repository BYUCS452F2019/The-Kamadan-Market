import knex from './connection'

module.exports.clearDB = async () => {
    await knex.schema.raw('delete from Users where \'A\'=\'A\';')
    await knex.schema.raw('delete from BarterOptions where \'A\'=\'A\';')
    await knex.schema.raw('delete from Posts where \'A\'=\'A\';')
    await knex.schema.raw('delete from Items where \'A\'=\'A\';')
    await knex.schema.raw('delete from ItemType where \'A\'=\'A\';')
}