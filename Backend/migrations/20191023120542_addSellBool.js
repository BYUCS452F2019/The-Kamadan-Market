
exports.up = function(knex) {
  return knex.schema.table('Posts', function(table){
      table.boolean('isSelling').notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.table('Posts', function(table){
      table.dropColumn('isSelling')
  })
};
