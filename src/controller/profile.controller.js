const Profile = require('../models/profile.model');
const { fileUploadOnCloudinary } = require('../utils/uploadFileCloudinary');
const { ApiResponse, asyncHandler } = require('../utils');

// create a new profile
const createProfile = asyncHandler(async (req, res) => {
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

    let photoUrl;
    let coverUrl;

    if (req.files && Array.isArray(req.files.photo) && req.files.photo.length > 0) {
        photoUrl = await fileUploadOnCloudinary(req?.files?.photo[0]?.buffer);
    }
    if (req.files && Array.isArray(req.files.coverPhoto) && req.files.coverPhoto.length > 0) {
        coverUrl = await fileUploadOnCloudinary(req?.files?.coverPhoto[0]?.buffer);
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

    return res.status(201).json(new ApiResponse(200, result, 'Profile registered Successfully'));
});

module.exports = { createProfile };
