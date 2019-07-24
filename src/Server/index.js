const express = require('express');
const bodyParser = require('body-parser'); 
const fs = require('fs');
const path = require('path')
// const pdf = require('../Server/pdf');

const api =  express();
console.log(`${__dirname}`);
// api.use(express.static(__dirname + './../Client/')); 
api.use(express.static(path.join(__dirname, '../Client/')));
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true}));

let listener = api.listen(8080, function(){
    console.log('API works on port ' + listener.address().port);
});
