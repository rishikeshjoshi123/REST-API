require('dotenv').config();

const express = require('express');
const app = express();

//to parse 'req.body' as json 
app.use(express.json());

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on('open', () => console.log('Connected to Database'));
db.on('error', (E) => console.log('Error found while setting mongodb: ' + E));



const subscribers = require('./routes/subscribers');
app.use('/subscribers', subscribers);



const port = 3000;
app.listen(port, () => {
    console.log(`Server Started at port: ${port}`);
})