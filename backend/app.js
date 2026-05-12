require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const phonesRouter = require('./Router/phones.router');
const globalErrorHandler = require('./Controllers/error.controller');
const mongoose = require('mongoose');
const authRouter = require('./Router/auth.router');
const cookieParser = require('cookie-parser');
const app= express();
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use("/api/phones", phonesRouter)
app.use("/api/auth", authRouter)
app.use(globalErrorHandler)

mongoose.connect(process.env.DB_CONNECTION)
    .then(() => {
        console.log("Connected to database");

        app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`))
    })