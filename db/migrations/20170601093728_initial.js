exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('garage', function (table) {
      table.increments('id').primary()
      table.string('name')
      table.timestamps(true, true)
    }),
    knex.schema.createTable('items', function (table) {
      table.increments('id').primary()
      table.integer('garage_id').unsigned()
      table.foreign('garage_id')
        .references('garage.id')
      table.string('name')
      table.string('reason')
      table.enu('cleanliness', ['Sparkling', 'Dusty', 'Rancid'])
      table.timestamps(true, true)
    })
  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('items'),
    knex.schema.dropTable('garage')
  ])
}
