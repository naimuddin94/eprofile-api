/* eslint-disable prettier/prettier */
const { asyncHandler, ApiError, ApiResponse } = require('../utils');

// get data by owner id
const getDataByOwnerIdFn = (dbCollectionName) => asyncHandler(async (req, res) => {
        const { id } = req.params;

        if (!id) {
            throw new ApiError(401, 'Owner Id is required');
        }
        const result = await dbCollectionName.findOne({ createdBy: id });

        if (!result) {
            throw new ApiError(401, 'Profile not found');
        }
        return res.json(new ApiResponse(200, result));
    });

// update function
const updateByOwnerIdFn = (dbCollectionName) => asyncHandler(async (req, res) => {
        const { id } = req.params;

        // Exclude password field from req.body
        if (req?.body?.password) {
            delete req.body.password;
        }

        const result = await dbCollectionName.findOneAndUpdate({ createdBy: id }, req.body, {
            new: true,
        });

        if (!result) {
            throw new ApiError(401, 'Data not found!');
        }

        return res.json({ message: 'Updated successfully' });
});

module.exports = { getDataByOwnerIdFn, updateByOwnerIdFn };
