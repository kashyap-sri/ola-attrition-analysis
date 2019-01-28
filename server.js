const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const apis = require('./apis');

app.listen(port, () => console.log(`Listening on port ${port}`));


app.get('/', (req, res) => {
    res.send('Home Page')
});

app.get('/getSummary', apis.getSummary);
app.get('/getConScores', apis.getConScores);
app.get('/getProScores', apis.getProScores);
app.get('/getProFrequencies', apis.getProFrequencies);
app.get('/getConFrequencies', apis.getConFrequencies);