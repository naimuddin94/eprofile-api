/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const contactSchema = require('./contact.model');

// founder schema
const founderSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true,
    },
    designation: {
        type: String,
        // required: true,
    },
    startDate: {
        type: Date,
        // required: true,
    },
    endDate: {
        type: Date,
    },
    responsibilities: {
        type: String,
    },
});

const companySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            // required: [true, 'Name is required'],
        },
        username: {
            type: String,
            // required: [true, 'Username is required'],
        },
        photo: {
            type: String,
        },
        coverPhoto: {
            type: String,
        },
        introduction: {
            type: String,
        },
        mission: {
            type: String,
        },
        history: {
            type: String,
        },
        founder: {
            type: [founderSchema],
            // required: [true, 'Founder is required'],
        },
        location: {
            type: String,
            // required: [true, 'Location is required'],
        },
        services: {
            type: String,
            // required: [true, 'Services is required'],
        },
        targetMarket: {
            type: String,
            // required: [true, 'TargetMarket is required'],
        },
        advantage: {
            type: String,
        },
        financial: {
            type: String,
        },
        achievements: {
            type: String,
        },
        partnerships: {
            type: String,
        },
        responsibility: {
            type: String,
        },
        goals: {
            type: String,
        },
        contact: {
            type: contactSchema,
            // required: [true, 'Contact information is required'],
        },
        status: {
            type: String,
            enum: ['published', 'pending'],
            default: 'pending',
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User id required'],
        },
    },
    {
        timestamps: true,
    },
);

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
