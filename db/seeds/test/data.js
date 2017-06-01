exports.seed = function(knex, Promise) {
  return knex('items').del()

    .then(() => {
      return Promise.all([
          knex('items').insert([
            { name: 'TESTBike', reason: 'Flat tire', cleanliness: 'Dusty' },
            { name: 'TESTCar', reason: 'Keep it safe', cleanliness: 'Sparkling' },
            { name: 'TESTOld Clothes', reason: 'Too lazy to take to goodwill', cleanliness: 'Rancid' }
          ])
      ])
    })
}
