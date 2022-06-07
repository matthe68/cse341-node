const express = require('express');
const app = express();
const port = process.eng.PORT || 3000;

app.use('/', require('./routes'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})