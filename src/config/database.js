const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDatabase = () => {
  mongoose
    .connect(process.env.MONGO_URI || 'mongodb://admin:secret@localhost:27017', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Could not connect to MongoDB', err));
};

module.exports = connectDatabase;
