const routes = require('express').Router();

routes.get('/', (req, res) => {
  res.send('Shannon Christensen');
})

module.exports = routes;