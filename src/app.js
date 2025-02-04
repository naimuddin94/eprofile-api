/* eslint-disable comma-dangle */
/*
 * Title: E-Profiles Application
 * Description: A Backend Application With Express JS
 * Author: Md Naim Uddin
 * Date: 31/03/2024
 *
 */

// dependencies
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const globalErrorHandler = require('./lib/globalErrorHandler');
const userRouter = require('./routes/user.routes');
const authRouter = require('./routes/auth.routes');
const profileRouter = require('./routes/profile.routes');
const companyRouter = require('./routes/company.routes');
const adminRouter = require('./routes/admin.routes');

const app = express();

// middleware
app.use(express.json());
app.use(
    cors({
        origin: [
            'http://localhost:5173',
            'http://localhost:3000',
            'https://eprofiles.vercel.app',
            'https://eprofile-admin-dashboard.netlify.app',
        ],
        credentials: true,
    })
);
app.use(cookieParser());

// routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/profile', profileRouter);
app.use('/api/v1/companies', companyRouter);
app.use('/api/v1/admin', adminRouter);

// testing route
app.get('/', (req, res) => {
    res.send('Server is running....');
});

// handling all route which is not found
app.all('*', (req, res, next) => {
    const error = new Error(`Can't find ${req.originalUrl} on the server`);
    error.status = 404;
    next(error);
});

// error handling middleware
app.use(globalErrorHandler);

module.exports = app;
