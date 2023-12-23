// setting up express server
const express = require('express');
const path = require('path');

// defining port
const port = 8000;

// requiring necessary modules and files
const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

// setting view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// using middleware for form data and static files
app.use(express.urlencoded());
app.use(express.static('assets'));

// handling GET request for home route
app.get('/', function(req, res){
    // finding all contacts in the database
    Contact.find({})
    .then(contacts => {
        // rendering home page with contacts list
        return res.render('home', {
            title: "Contacts List",
            Contact_List: contacts
        });
    })
    .catch(err => {
        console.log('Error in fetching contacts from db:', err);
    });    
});

// handling GET request to delete a contact
app.get('/delete-contact/', function(req, res){
    let id = req.query.id;
    // finding contact by ID and deleting it
    Contact.findByIdAndDelete(id)
    .then(() => {
        // redirecting back to the previous page
        return res.redirect('back');
    })
    .catch(err => {
        console.log('Error in deleting an object from the database:', err);
    });
});

// handling POST request to add a new contact
app.post('/contact-list', function(req, res){
    // creating a new contact using data from the form
    Contact.create({
        name: req.body.name,
        number: req.body.number
    })
    .then(newContact => {
        console.log('*****', newContact);
        // redirecting back to the previous page after adding the contact
        res.redirect('back');
    })
    .catch(err => {
        console.log('error in creating a contact:', err);
    });
});

// listening on the specified port for incoming requests
app.listen(port, function(err){
    if(err){ 
        console.log('Error in fetching the page.',err); 
    }
    console.log('Yess!! My express server is running on port:', port);
});
