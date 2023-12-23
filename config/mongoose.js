// requiring the mongoose library
const mongoose = require('mongoose');

// connecting to the MongoDB database named 'contacts_list_db'
mongoose.connect('mongodb://localhost/contacts_list_db');

// getting the database connection instance
const db = mongoose.connection;

// handling error event for the database connection
db.on('error', console.error.bind(console, 'error connecting to db'));

// handling once the database connection is open
db.once('open', function(){
    console.log('Successfully connected to database');
});
