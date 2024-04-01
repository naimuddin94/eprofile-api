/* eslint-disable consistent-return */

// get all data from the database collection
const getAllDataFn = (dbCollectionName) => async (req, res) => {
    try {
        const result = await dbCollectionName.find();
        res.send(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get single data by id from the database collection
const getSingleDataFn = (dbCollectionName) => async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Id is required' });
        }
        const result = await dbCollectionName.findById(id);

        if (!result) {
            return res.status(404).json({ message: 'Not found' });
        }
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// save new data to database
const createFn = (dbCollectionName) => async (req, res) => {
    try {
        await dbCollectionName.create(req.body);
        res.status(201).json({ message: 'Saved successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// update function
const updateFn = (dbCollectionName) => async (req, res) => {
    try {
        const { id } = req.params;

        // Exclude password field from req.body
        if (req?.body?.password) {
            delete req.body.password;
        }

        const result = await dbCollectionName.findByIdAndUpdate(id, req.body, {
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

// delete function
const deleteFn = (dbCollectionName) => async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'ID is required' });
        }

        const result = await dbCollectionName.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'Deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get user role
const getUserRoleFn = (dbCollectionName) => async (req, res) => {
    try {
        const { email } = req.params;
        const user = await dbCollectionName.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { role } = user;
        const { name } = user;
        res.send({ role, name });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllDataFn,
    getSingleDataFn,
    createFn,
    updateFn,
    deleteFn,
    getUserRoleFn,
};
