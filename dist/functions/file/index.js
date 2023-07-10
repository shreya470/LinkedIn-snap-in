"use strict";
const csv = require('csv-parser');
const fs = require('fs');
const filePath = 'src\functions\file\accountsProd.csv';
const results = [];
fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => {
    results.push(data);
})
    .on('end', () => {
    console.log(results);
});
