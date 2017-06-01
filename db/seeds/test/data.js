exports.seed = function(knex, Promise) {
  return knex('items').del()

    .then(() => {
      return Promise.all([
          knex('items').insert([
            { id: 1 , name: 'TESTBike', reason: 'Flat tire', cleanliness: 'Dusty' },
            { id: 2, name: 'TESTCar', reason: 'Keep it safe', cleanliness: 'Sparkling' },
            { id: 3, name: 'TESTOld Clothes', reason: 'Too lazy to take to goodwill', cleanliness: 'Rancid' }
          ])
      ])
    })
}
