const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');


const app = express();
app.use(bodyParser.json());

db.pool.query(`CREATE TABLE lists (
    id INTEGER AUTO_INCREMENT,
    value TEXT,
    PRIMARY KEY (id)
);`);

app.get('/api/values', (req, res, next) => {
   db.pool.query('SELECT * FROM lists;', (err, results, fields) => {
       if(err) return res.status(500).send(err);

       return res.status(200).json(results);
   }) 
});

app.post('/api/value', (req, res, next) => {
    db.pool.query(`INSERT INTO lists (value) VALUES ("${req.body.value}");`, (err, results, fields) => {
        if(err) return res.status(500).send(err);

        return res.status(201).json({ success: true, value: req.body.value });
    })
});

app.listen(5000, () => {
    console.log('Server is running on PORT 5000');
})