exports.seed = function(knex, Promise) {
  return knex('items').del()
    .then(() => knex('garage').del())

    .then(() => {
      return Promise.all([
        knex('garage').insert({
          name: 'Test Garage'
        }, 'id')
        .then(garageId => {
          return knex('items').insert([
            { name: 'BikeTest', reason: 'Flat tire', cleanliness: 'Dusty', garage_id: garageId[0] },
            { name: 'CarTest', reason: 'Keep it safe', cleanliness: 'Sparkling', garage_id: garageId[0] },
            { name: 'Old ClothesTest', reason: 'Too lazy to take to goodwill', cleanliness: 'Rancid', garage_id: garageId[0] }
          ])
        })
      ])
    });
};
