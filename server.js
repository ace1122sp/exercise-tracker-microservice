const config = require('./config');

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const router = require('./router');

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const app = express();

// basic configuration
const PUBLIC = path.resolve(__dirname, 'public');
const PORT = config.app.port;

// set up database 

// implement middlewares
app.use(cors());
app.use(jsonParser);
app.use(urlencodedParser);

app.use('/public', express.static(PUBLIC));

// implement router
app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

// mount server
app.listen(PORT, () => console.log(`server listening on ${PORT}`));

