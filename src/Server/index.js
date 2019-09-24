const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const pdf = require('./pdf');

const api = express();
console.log(`${__dirname}`);

api.use(express.static(path.join(__dirname, './../')));
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({extended: true}));

let listener = api.listen(8080, function() {
  console.log('API works on port ' + listener.address().port);
});

api.get('/', (req, res) => {
  res.render(path.join(__dirname, '../Client/index.html'));
});

api.post('/add', function(req, res) {
  try {
    console.log(req.body);
    pdf.generatePDF(req.body);

    res.redirect('/download');
  } catch (error) {
    console.log(error);
  }
});

api.get('/download', (req, res) => {
  const file = path.join(__dirname, '../../pdf/confirmation.pdf');
  res.download(file);
});
