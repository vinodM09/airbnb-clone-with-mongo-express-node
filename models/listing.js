const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        maxlength: 100,
    },
    image: {
        type: String,
        required: true,
        default: 'https://wallup.net/wp-content/uploads/2019/09/972645-path-village-nature-houses-sky-trees-landscape-road-clouds-sunset.jpg',
        set: (v) => v === '' ? 'https://wallup.net/wp-content/uploads/2019/09/972645-path-village-nature-houses-sky-trees-landscape-road-clouds-sunset.jpg' : v, // this ternory operator is used when the image is coming but is empty
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    country: {
        type: String,
    },
});

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;