const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '../formData.json');
const csvPath = path.join(__dirname, '../formData.csv');

fs.readFile(jsonPath, 'utf8', (err, data) => {
  if (err) return console.error('Error reading JSON:', err);

  const arr = JSON.parse(data);
  const headers = Object.keys(arr[0]);
  const csv = [
    headers.join(','),
    ...arr.map(row => headers.map(h => `"${(row[h] || '').replace(/"/g, '""')}"`).join(','))
  ].join('\n');

  fs.writeFileSync(csvPath, csv, 'utf8');
  console.log('✅ CSV file created at:', csvPath);
});
