const mongoose = require('mongoose');
const sampleListings = require('./sampleListings.js');
const Listing = require('../models/listing.js');

const MONGO_URL = 'mongodb://127.0.0.1:27017/airbnb';

main()
    .then((res) => {
        console.log('Connected to database named airbnb');
    })
    .catch((err) => {
        console.log(err);
    });

async function main(){
    await mongoose.connect(MONGO_URL);
};

const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany( sampleListings.data );
    console.log('data was initialized');
};

initDB();