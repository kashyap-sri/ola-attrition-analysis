const fs = require('fs');
const csv = require('csvtojson');

module.exports.getSummary = (req, res) => {
    const path = (req.query && req.query.company && req.query.company === 'uber') ? 'summaryuber' : 'summary';
    const filePath = `./data/${path}.csv`;
    csv().fromFile(filePath)
    .then((json) => {
        res.json(json);
    });
}

module.exports.getConScores = (req, res) => {
    const filePath = './data/conscores.csv';
    csv().fromFile(filePath)
    .then((json) => {
        res.json(json)
    });
}

module.exports.getProScores = (req, res) => {
    const filePath = './data/proscores.csv';
    csv().fromFile(filePath)
    .then((json) => {
        res.json(json)
    });
}

module.exports.getProFrequencies = (req, res) => {
    const filePath = './data/profrequency.json';
    const raw = fs.readFileSync(filePath);
    console.log(raw);
    const data = JSON.parse(raw);
    console.log(data);
    res.json(data);
}

module.exports.getConFrequencies = (req, res) => {
    const filePath = './data/confrequency.json';
    const raw = fs.readFileSync(filePath);
    const data = JSON.parse(raw);
    res.json(data);
}