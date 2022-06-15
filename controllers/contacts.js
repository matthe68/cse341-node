const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllContacts = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists); // we just need the first one (the only one)
  });
};

const getContactByID = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('contacts').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createNewClient = async (request, response) => {
  const newUser = request.body;
  console.log("newUser: ", newUser);
  const result = await mongodb.getDb().db().collection('contacts').insertOne(newUser);
  if (result.acknowledged) {
    console.log("result: ", result.insertedId);
    response.setHeader('Content-Type', 'application/json');
    response.status(201).json(result);
  } else {
    response.setHeader('Content-Type', 'application/json');
    response.status(500).json(response.error || "Some error occured while creating the contact.");
  }
};

const updateContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const contact = req.body;
  const response = await mongodb.getDb().db().collection('contacts').replaceOne({ _id: userId }, contact);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the contact.');
  }
};

const deleteContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('contacts').remove({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
};
module.exports = { getAllContacts, getContactByID, createNewClient, updateContact, deleteContact };

/*.catch((err) => {
  callback(err);
});*/