const express = require('express');
const app = express();
const port = 3000;
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const Listing = require('./models/listing.js');
const path = require('path');
const ejsMate = require('ejs-mate');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, '/public')));
app.engine('ejs', ejsMate);

const MONGO_URL = 'mongodb://127.0.0.1:27017/airbnb';
main()
    .then((res) => {
        console.log('Connected to database named airbnb.');
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
};

// Home Route
app.get('/', (req, res) => {
    res.render('listings/home');
});

// Create Listing
app.get('/listings/create', (req, res) => {
    res.render('listings/newListing');
});

// Edit Listing Route
app.get('/listings/:id/edit_form', async (req, res) => {
    let { id } = req.params;
    let detailListing = await Listing.findById(id);
    res.render('listings/editForm', { detailListing });
});

// Detail Listing
app.get('/listings/:id', async (req, res) => {
    let { id } = req.params;
    let detailListing = await Listing.findById(id);
    res.render('listings/detailListing', { detailListing });
});

// update listing
app.put('/listings/:id', async (req, res) => {
    let { id } = req.params;
    let { title, description, image, price, location, country } = req.body;
let updatedListing = await Listing.findByIdAndUpdate(id, { title, description, image, price, location, country }, {new: true, runValidators:true });
    res.redirect(`/listings/${id}`);
    // console.log(updatedListing);
});

// Delete Listing
app.delete('/listings/:id', async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findById(id);
    await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect('/listings');
});

// Show Listings Route
app.get('/listings', async (req, res) => {
    let list = await Listing.find();
    res.render('listings/listings', { list });
});

// privacy route
app.get('/privacy', (req, res) => {
    res.render('listings/privacy.ejs');
});

// terms route
app.get('/terms', (req, res) => {
    res.render('listings/terms.ejs');
});

// Insert Listing
app.post('/upload', async (req, res) => {
    // let { title, description, image, price, location, country } = req.body;
    // await Listing.insertOne({ title, description, image, price, location, country });
    // res.redirect('/listings');
    try {
        const newData = new Listing(req.body);
        await newData.save();
        res.redirect('/listings');
    } catch (error) {
        res.status(400).send("Error: " + error.message); // Send error as plain text
    }
});

app.listen(port, () => {
    console.log(`Express server is listening at port ${port}.`);
});