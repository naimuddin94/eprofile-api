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

// experience schema
const experienceSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true,
    },
    jobTitle: {
        type: String,
        required: true,
    },
    dateOfEmployment: {
        type: String,
        required: true,
    },
    responsibilities: {
        type: String,
    },
});

// skills schema for skills fields
const skillsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
});

// language schema for language fields
const languageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    variant: { type: String, required: true },
});

// project schema for project fields
const projectSchema = new mongoose.Schema({
    projectName: { type: String, required: true },
    link: { type: String, required: true },
    projectDescription: { type: String },
    files: { type: [String] },
    portfolioLink: { type: String },
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
            // required: true,
        },
        education: {
            type: [educationSchema],
        },
        experience: {
            type: [experienceSchema],
            required: true,
        },
        skills: {
            type: [skillsSchema],
            required: true,
        },
        professionalMemberships: {
            type: String,
        },
        language: {
            type: [languageSchema],
            required: true,
        },
        volunteerWork: {
            type: String,
        },
        project: {
            type: projectSchema,
        },
        publications: {
            type: String,
        },
        testimonials: {
            type: String,
        },
        hobbies: {
            type: String,
        },
        careerGoals: {
            type: String,
        },
        approved: {
            type: Boolean,
            default: false,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true,
        },
    },
    { timestamps: true }
);

// Define unique indexes
profileSchema.index({ owner: 1 }, { unique: true });

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
