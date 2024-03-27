//Package depedencies
//const express = require('express');
import express, { Router } from 'express';
import courseRouter from './routers/course.router.js';
import getPublicPath from './helpers/path.js';

const app = express();

const options = {};
const root = getPublicPath();

//Use Middleware
app.use(express.json());
app.use("/api", courseRouter);
app.use(express.static(root, options));

//Arbitrary port number which this server listens on
const port = process.env.PORT || 3000;
//Creating express server 
app.listen(port, ()=> {
    console.log(`Server is listening on port http://localhost:${port}`);
});

