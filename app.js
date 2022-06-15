const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongodb = require('./db/connect');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

app.use('/', require('./routes'));

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});