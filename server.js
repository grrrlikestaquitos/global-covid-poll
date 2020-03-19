const express = require('express');
const bodyParser = require('body-parser');
const knexfile = require('./knexfile');
const knex = require('knex')(knexfile);

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/home', (req, res) => {
  res.json({
    cases: {
      positive: 0,
      negative: 0,
      untested: 0
    }
  })
});

app.listen(port, () => console.log(`Listening on port ${port}`));