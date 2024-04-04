/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
const path = require('path');
const Profile = require('../models/profile.model');
const { fileUploadOnCloudinary } = require('../utils/uploadFileCloudinary');

const createProfile = async (req, res) => {
    try {
        const {
                fullName,
                title,
                objective,
                contactInformation,
                education,
                experience,
                skills,
                professionalMemberships,
                language,
                volunteerWork,
                project,
                publications,
                testimonials,
                hobbies,
                careerGoals,
                createdBy,
        } = req.body;

        console.log('from 28');
        let photoUrl;
        let coverUrl;

        if (req.files && Array.isArray(req.files.photo) && req.files.photo.length > 0) {
            photoUrl = await fileUploadOnCloudinary(req?.files?.photo[0]?.buffer);
        }
        if (req.files && Array.isArray(req.files.coverPhoto) && req.files.coverPhoto.length > 0) {
            coverUrl = await fileUploadOnCloudinary(req?.files?.coverPhoto[0]?.buffer);
        }
        console.log('from 31');

        console.log(38, { photoUrl, coverUrl });

        const result = await Profile.create({
            fullName,
            photo: photoUrl,
            coverPhoto: coverUrl,
            title,
            objective,
            contactInformation,
            education,
            experience,
            skills,
            professionalMemberships,
            language,
            volunteerWork,
            project,
            publications,
            testimonials,
            hobbies,
            careerGoals,
            createdBy,
        });

        res.status(201).json({ message: 'Profile saved successfully', result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createProfile };
