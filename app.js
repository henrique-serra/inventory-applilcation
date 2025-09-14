const express = require('express');
require('dotenv').config();
const path = require('path');
const morgan = require('morgan');
const app = express();

const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.listen(port, (err) => {
    if (err) throw err;
    console.log('Server listening on port ', port);
})