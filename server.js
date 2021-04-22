'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const weather = require('./modules/weather.js');
const app = express();
app.use(cors());

app.get('/city_weather', weatherHandler);

function weatherHandler(request, response) {
  console.log(request.query)
  const { lat, lon } = request.query;
  weather(lat, lon)
    .then(summaries => response.send(summaries))
    .catch((error) => {
      console.error(error);
      response.status(200).send('Sorry. Something went wrong!');
    });
}

const PORT = process.env.PORT || 3001;


app.listen(process.env.PORT, () => console.log(`Server up on ${process.env.PORT}`));
