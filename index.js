
(async function () {
  console.log(doc.title);
  await doc.updateProperties({ title: 'renamed doc' });
  const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
  await sheet.addRows([
    { title: 'Software Engineer', location: 'SEA' },
    { title: 'Communications Specialist', location: 'SFO' },
  ]);
})()

