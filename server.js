const express = require ('express');
const bodyParser = require('body-parser');
const databaseHandler = require ('./databaseHandler.js');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.listen(PORT, ()=>{
    console.log('Running on port: '+ PORT);
});