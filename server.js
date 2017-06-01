const express = require('express');

const app = express();
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);
app.locals.title = 'GarageDoor';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (request, response ) => {
  fs.readFile(`${__dirname}/index.html`, (err, file) => {
    response.send(file)
  })
});

app.get('/api/v1/items', (request, response) => {
    database('items').select()
    .then(item => response.status(200).json(item))
    .catch((error) => {
      response.status(404).send('no items in garage', error);
    });
});

app.get('/api/v1/items/:id', (request, response) => {
  database('items').where('id', request.params.id).select()
    .then(item => response.status(200).json(item))
    .catch((error) => {
      response.status(404).send('no item matching', error);
    });
});

app.patch('/api/v1/items/:id', (request, response) => {
  const cleanliness = request.body.cleanliness;

  if (!cleanliness) {
    response.status(404).send('not found');
  } else {
    database('items').where('id', request.params.id).update({ cleanliness })
    .then(() => {
      response.status(200).send('updated');
    })
    .catch(() => {
      response.status(422).send('not updated');
    });
  }
});

app.post('/api/v1/items', (request, response) => {
  const { name, reason, cleanliness } = request.body

  if (!name && !cleanliness && reason) {
    response.status(422).send({ error: 'You are missing data' });
  } else {
    database('items').insert({ name, reason, cleanliness })
    .then(() => {
      response.sendStatus(201);
    })
    .catch((error) => {
      response.sendStatus(404).json({ 'error: ': error });
    });
  }
});


if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`)
  });
}

module.exports = app;
