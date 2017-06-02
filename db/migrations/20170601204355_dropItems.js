
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('items')
  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('items', function (table) {
      table.increments('id').primary()
      table.string('name')
      table.string('reason')
      table.enu('cleanliness', ['Sparkling', 'Dusty', 'Rancid'])
      table.timestamps(true, true)
    })
  ])
}
