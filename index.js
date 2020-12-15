const Sheet = require('./sheet');
const fetch = require('node-fetch');

async function scrapePage(i) {
  const res = await fetch(`https://jobs.github.com/positions.json?page=${i}&search=code`);
  const json = await res.json();
  
  const rows = json.map(job => {
    return {
      company: job.company,
      title: job.title,
      location: job.location,
      date: job.created_at,
      url: job.url
    }
  });

  return rows;
}

(async function () {
  
  let i = 1;
  let rows = [];
  while (true) {
    const newRows = await scrapePage(i);
    if (newRows.length === 0) break;
    rows = [...rows, ...newRows];
    // console.log('new row length', rows)
    i++;
  }

  let remoteRows = [];
  let javascriptRows = [];
  let locationData = 'remote';
  let locationData2 = 'Remote';
  let jobData = 'Developer';

  for (let job in rows) {
    if (rows[job].location.includes(locationData) || rows[job].location.includes(locationData2)) {
      remoteRows.push(rows[job]);
    }
  }

  for (let job in remoteRows) {
    if (remoteRows[job].title.includes(jobData)) {
      javascriptRows.push(remoteRows[job]);
    }
  }

  const finalRows = javascriptRows.sort((a, b) => b.date - a.date)

  // console.log('total rows length', rows.length);
  const sheet = new Sheet();
  await sheet.load();

  await sheet.addRows(finalRows);

})()

