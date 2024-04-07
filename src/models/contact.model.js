const mongoose = require('mongoose');

// contactSchema for contact information
const contactSchema = new mongoose.Schema({
    street: {
        type: String,
        required: false,
    },
    house: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: false,
    },
    state: {
        type: String,
        required: false,
    },
    postalCode: {
        type: String,
        required: false,
    },
    country: {
        type: String,
        required: false,
    },
    mobileNumber: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    website: {
        type: String,
    },
    linkedin: {
        type: String,
    },
    facebook: {
        type: String,
    },
    twitter: {
        type: String,
    },
    instagram: {
        type: String,
    },
    youtube: {
        type: String,
    },
});

module.exports = contactSchema;
