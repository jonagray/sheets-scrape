require('dotenv').config();

const { GoogleSpreadsheet } = require('google-spreadsheet');

module.exports = class Sheet {
  constructor() {
    this.doc = new GoogleSpreadsheet(process.env.SHEET_ID);
  }

  async load() {
    await this.doc.useServiceAccountAuth(require('./credentials.json'));
    await this.doc.loadInfo();
  }

  async addRows(rows) {
    const sheet = this.doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
    await sheet.addRows(rows);
  }
}

// Test
// (async function () {
//   const sheet = new Sheet();
//   await sheet.load();
//   sheet.addRows([
//     { title: 'Software Engineer', location: 'SEA' },
//     { title: 'Communications Specialist', location: 'SFO' },
//   ]);
// })()