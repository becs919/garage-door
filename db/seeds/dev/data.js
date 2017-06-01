exports.seed = function(knex, Promise) {
  return knex('items').del()

    .then(() => {
      return Promise.all([
          knex('items').insert([
            { name: 'Bike', reason: 'Flat tire', cleanliness: 'Dusty' },
            { name: 'Car', reason: 'Keep it safe', cleanliness: 'Sparkling' },
            { name: 'Old Clothes', reason: 'Too lazy to take to goodwill', cleanliness: 'Rancid' }
          ])
      ])
    })
}
