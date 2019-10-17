
exports.up = function(knex) {
  return Promise.all([
    knex.schema.dropTableIfExists('BarterOptions'),
    knex.schema.dropTableIfExists('Posts'),
    knex.schema.dropTableIfExists('Users'),
    knex.schema.dropTableIfExists('Items'),
    knex.schema.dropTableIfExists('ItemType'),
    knex.schema.createTable('Users', function(table) {
        table.increments('userID').primary().notNullable()
        table.string('gamertag').notNullable()
        table.string('firstName').notNullable()
        table.string('lastName').notNullable()
        table.string('email').notNullable()
        table.string('password').notNullable()
    }),
  
    knex.schema.createTable('ItemType', function(table){
        table.increments('typeID').primary().notNullable()
        table.string('typeName').notNullable()
    }),
  
    knex.schema.createTable('Items', function(table){
      table.increments('itemID').primary().notNullable()
      table.integer('typeID').unsigned().references('typeID').inTable('ItemType').onDelete('SET NULL')
    }),
  
    knex.schema.createTable('Posts', function(table){
      table.increments('postID').notNullable().primary()
      table.integer('userID').unsigned().references('Users.userID').onDelete('CASCADE')
      table.integer('itemID').unsigned().references('Items.itemID').onDelete('SET NULL')
      table.timestamp('time').defaultTo(knex.fn.now())
      table.integer('goldCost').nullable().unsigned()
      table.string('postText').notNullable()
      table.boolean('active').notNullable()
    }),
  
    knex.schema.createTable('BarterOptions', function(table){
      table.integer('postID').unsigned().references('Posts.postID').onDelete('CASCADE')
      table.integer('itemID').unsigned().references('Items.itemID')
      table.integer('askingNum').notNullable().unsigned()
      table.integer('groupNum').notNullable().unsigned()
      table.primary(['postID', 'itemID'])
    })
  ])
};

exports.down = function(knex) {
    return Promise.all([
        knex.schema.dropTableIfExists('BarterOptions'),
        knex.schema.dropTableIfExists('Posts'),
        knex.schema.dropTableIfExists('Users'),
        knex.schema.dropTableIfExists('Items'),
        knex.schema.dropTableIfExists('ItemType')
    ])
};
