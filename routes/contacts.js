const routes = require('express').Router();
const contacts = require('../controllers/contacts');

routes.get('/', contacts.getAllContacts)
routes.get('/:id', contacts.getContactByID)

module.exports = routes; 