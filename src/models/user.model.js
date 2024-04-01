/* eslint-disable comma-dangle */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema(
    {
        first_name: {
            type: String,
            required: true,
        },
        last_name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        date_of_birth: {
            type: Date,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['Admin', 'Basic'],
            default: 'Basic',
        },
    },
    { timestamps: true }
);

// eslint-disable-next-line func-names, consistent-return
userSchema.pre('save', async function (next) {
    try {
        // Check if the password is modified or this is a new user
        if (!this.isModified('password') || this.isNew) {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(this.password, salt);
            this.password = hashPassword;
        }
        next();
    } catch (error) {
        next(error);
    }
});

// Define unique indexes
userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
