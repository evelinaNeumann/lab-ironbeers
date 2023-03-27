const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const app = express();
const punkAPI = new PunkAPIWrapper;

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Set content type only for CSS files in the "public" directory
app.use('/public/stylesheets/*.css', (req, res, next) => {
  res.set('content-type', 'text/css');
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
    .then(beersFromApi => {
      res.render('beers', { beers: beersFromApi });
    })
    .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
    .then(beersFromApi => {
      const randomBeer = beersFromApi[0];
      res.render('random-beer', { randomBeer });
    })
    .catch(error => console.log(error));
});
app.listen(3000, () => console.log('🏃‍ on port 3000'));

