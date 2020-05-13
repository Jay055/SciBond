// connnet to mongo db with moongose 
const mongoose = require('mongoose');

// import config to read data from default.json
const config = require('config');

// get the mongoURI from deault.json file
const db = config.get('mongoURI');


// connect to mongodb 
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      // Pass parameters to avoid depreciation warning 
      useNewUrlParser: true,
      
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true 
    });

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;