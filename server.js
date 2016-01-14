import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import routes from './api/routes';

// Set up and start server
dotenv.load();
const app = express();
const port = process.env.PORT || 1337;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, () => {
  console.log(`ELKO Boligpartner API running on port ${port}.`);
});

// Load routes
app.use('/', routes);

// Connect to mongodb server
mongoose.connect('mongodb://'
  + process.env.MONGO_USER + ':'
  + process.env.MONGO_PASSWORD + '@'
  + process.env.MONGO_HOST + '/'
  + process.env.MONGO_DB
);

module.exports = app; // Has to be module.exports
