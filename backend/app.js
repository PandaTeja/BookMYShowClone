require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const eventRoutes = require('../backend/routes/events');

const app = express();

mongoose.connect(process.env.MONGOURI)
.then(()=>console.log("Connection Success"))
.catch(error => console.log('Mongo Connection Failed : ',error));

app.use(cors())
app.use(express.json());

app.use('/api/events',eventRoutes);

module.express = app;