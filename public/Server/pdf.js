function generateName() {
  let name = `confirmation.pdf`;
  return name;
}

module.exports = {
  /* Generowanie PDF'a */
  generatePDF: function(obj) {
    const pdf = require('pdfkit');
    const fs = require('fs');
    const FONT_URL = '../Client/assets/fonts/Poppins-Regular.ttf';
    const IMAGE_URL = '../Client/assets/img/logo.jpg';

    let doc = new pdf();

    doc.pipe(fs.createWriteStream('./../../pdf/' + generateName()));

    doc.font(FONT_URL);
    doc.image(IMAGE_URL, 0, -100);
    doc.fontSize(24);
    doc.text('marveloushotel.io', 190, 180);
    doc.fontSize(18);
    doc.text('Apartment: ' + obj.name, 25, 230);
    doc.text('Adress: ' + obj.address, 25, 260);
    doc.fontSize(12);
    doc.text('Personal data: ', 25, 310);
    doc.text('First name: ' + obj.firstName, 25, 360);
    doc.text('Last name: ' + obj.lastName, 25, 375);
    doc.text('ID number: ' + obj.id, 25, 390);
    doc.text('Card number: ' + obj.card, 25, 405);
    doc.text('From: ' + obj.date1, 25, 420);
    doc.text('To: ' + obj.date2, 25, 435);
    doc.fontSize(14);
    doc.text('Price: ' + obj.price + '$', 25, 450);

    doc.fontSize(10);
    doc.text(
      'This pdf was generated automatically. Keep this document to confirm the reservation.',
      100,
      660
    );
    doc.text(
      'marveloushotel.io 760 Market St. 10th Floor, Los Angeles, CA94103',
      160,
      680
    );
    doc.text(new Date(), 200, 700);

    doc.end();
  }
};
