const express = require("express");
const app = express();
const port = 3001;
const cors = require('cors');
const bodyParser = require("body-parser");
const route = require('./routes/index');
app.use(bodyParser.json());

app.use(cors());
app.use('/', route);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});