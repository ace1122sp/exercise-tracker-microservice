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
mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on('error', err => console.log(err));
db.once('open', () => {
  console.log(`Server started on port ${PORT}`);
});

// implement middlewares
app.use(cors());
app.use(jsonParser);
app.use(urlencodedParser);

app.use('/public', express.static(PUBLIC));

// implement router
app.use('/api/exercise', router);
app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

// mount server
app.listen(PORT, () => {
  mongoose.connect(config.db.mongoURI, { useNewUrlParser: true });
});
