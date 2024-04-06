/* eslint-disable comma-dangle */
const mongoose = require('mongoose');
const contactSchema = require('./contact.model');

// occupationSchema for title
const occupationSchema = new mongoose.Schema(
    {
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
    },
    { _id: false }
);

// education schema for education
const educationSchema = new mongoose.Schema(
    {
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
    },
    { _id: false }
);

// experience schema
const experienceSchema = new mongoose.Schema(
    {
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
    },
    { _id: false }
);

// skills schema for skills fields
const skillsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
    },
    { _id: false }
);

// language schema for language fields
const languageSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        variant: { type: String, required: true },
    },
    { _id: false }
);

// project schema for project fields
const projectSchema = new mongoose.Schema(
    {
        projectName: { type: String },
        link: { type: String },
        projectDescription: { type: String },
        projectPhoto: { type: String },
        portfolioLink: { type: String },
    },
    { _id: false }
);

const profileSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        photo: {
            type: String,
            required: true,
        },
        coverPhoto: {
            type: String,
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
profileSchema.index({ createdBy: 1 }, { unique: true });

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
