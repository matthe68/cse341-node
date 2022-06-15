const routes = require('express').Router();
const contactsRoutes = require('./contacts');

routes.get('/', (req, res) => {
  res.send('Shannon Christensen');
})
routes.use('/contacts', contactsRoutes);

module.exports = routes;