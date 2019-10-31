
exports.up = function(knex) {
    return knex.schema.table('Items', function(table){
        table.string('itemName').notNullable()
    })
};

exports.down = function(knex) {
    return knex.schema.table('Items', function(table){
        table.dropColumn('itemName')
    })
};
