const express = require ('express');
const bodyParser = require('body-parser');
const databaseHandler = require ('./databaseHandler.js')
const app = express();
const port = 8080;

app.use(express.json());

app.listen(port, ()=>{
    console.log('Running on port: '+ port);
});