/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const contactSchema = require('./contact.model');

// founder schema
const founderSchema = new mongoose.Schema({
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

const companySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
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
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        services: {
            type: String,
            required: true,
        },
        targetMarket: {
            type: String,
            required: true,
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
            required: true,
        },
        status: {
            type: String,
            enum: ['published', 'pending'],
            default: 'pending',
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
