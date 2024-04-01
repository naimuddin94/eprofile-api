/* eslint-disable comma-dangle */
const mongoose = require('mongoose');

const { validateImageExtension } = require('../utils/utils');

// occupationSchema for title
const occupationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
    },
    responsibilities: {
        type: String,
    },
});

// contactSchema for contact information
const contactSchema = new mongoose.Schema({
    street: {
        type: String,
        required: true,
    },
    house: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    postalCode: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    website: {
        type: String,
        required: true,
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

// education schema for education
const educationSchema = new mongoose.Schema({
    instituteName: {
        type: String,
        required: true,
    },
    passingYear: {
        type: String,
        required: true,
    },
    cgpa: {
        type: String,
    },
    duration: {
        type: String,
        required: true,
    },
});

const profileSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        photo: {
            type: String,
            required: true,
            validate: [validateImageExtension, 'Invalid image url'],
        },
        coverPhoto: {
            type: String,
            validate: [validateImageExtension, 'Invalid cover image url'],
        },
        title: {
            type: [occupationSchema],
        },
        objective: {
            type: String,
        },
        contactInformation: {
            type: contactSchema,
            required: true,
        },
        education: {
            type: [educationSchema],
        },
    },
    { timestamps: true }
);

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
