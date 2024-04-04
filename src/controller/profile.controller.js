/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
const Profile = require('../models/profile.model');

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

        console.log('from 26', req.files);
        let photoUrl;
        let coverUrl;

        if (req.files && Array.isArray(req.files.photo) && req.files.photo.length > 0) {
            photoUrl = `${req.protocol}://${req.get('host')}/public/${req.files?.photo[0]?.filename}`;
        }
        if (req.files && Array.isArray(req.files.coverPhoto) && req.files.coverPhoto.length > 0) {
            coverUrl = `${req.protocol}://${req.get('host')}/public/${req.files?.coverPhoto[0]?.filename}`;
        }

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
