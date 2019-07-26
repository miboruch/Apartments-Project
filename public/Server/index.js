const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const pdf = require('./pdf');

const api = express();
console.log(`${__dirname}`);
api.use(express.static(path.join(__dirname, './../')));
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true }));

let listener = api.listen(8080, function() {
  console.log('API works on port ' + listener.address().port);
});

api.post('/add', function(req, res) {
  console.log(req.body);
  pdf.generatePDF(req.body);
  res.send('PDF generated!');
  console.log(req.url + ' / ' + req.method);
  console.log(res.statusCode);
});
