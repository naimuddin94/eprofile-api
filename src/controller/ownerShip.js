/* eslint-disable consistent-return */
// get data by owner id
const getDataByOwnerIdFn = (dbCollectionName) => async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Id is required' });
        }
        const result = await dbCollectionName.findOne({ createdBy: id });

        if (!result) {
            return res.status(404).json({ message: 'Not found' });
        }
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// update function
const updateByOwnerIdFn = (dbCollectionName) => async (req, res) => {
    try {
        const { id } = req.params;

        // Exclude password field from req.body
        if (req?.body?.password) {
            delete req.body.password;
        }

        const result = await dbCollectionName.findOneAndUpdate({ createdBy: id }, req.body, {
            new: true,
        });

        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'Updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getDataByOwnerIdFn, updateByOwnerIdFn };
