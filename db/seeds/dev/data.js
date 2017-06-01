// const path = require('path');
//
// const seedFile = require('knex-seed-file');

exports.seed = function(knex, Promise) {
  return knex('items').del()
    .then(() => knex('garage').del())

    .then(() => {
      return Promise.all([
        knex('garage').insert({
          name: 'All The Stuffs'
        }, 'id')
        .then(garageId => {
          return knex('items').insert([
            { name: 'Bike', reason: 'Flat tire', cleanliness: 'Dusty', garage_id: garageId[0] },
            { name: 'Car', reason: 'Keep it safe', cleanliness: 'Sparkling', garage_id: garageId[0] },
            { name: 'Old Clothes', reason: 'Too lazy to take to goodwill', cleanliness: 'Rancid', garage_id: garageId[0] }
          ])
        })
      ])
    });
};
