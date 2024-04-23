const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;
const host = '0.0.0.0';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'gym'
});

connection.connect();
// connection.query('SELECT * FROM details', (err, rows, fields) => {
//   console.log("data", rows);
// })

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Handle membership form submission
app.post('/submit-membership-form', (req, res) => {
    const formData = req.body;
    // Perform database insertion here
    // Example: connection.query('INSERT INTO membership_forms SET ?', formData, (error, results) => {...});
    res.send('Membership form submitted successfully');
  });
  
  // Handle contact form submission
  app.post('/submit-contact-form', (req, res) => {
    const formData = req.body;
    connection.query('INSERT INTO details SET ?', formData, (error, results) => {
      if (error) {
        console.error('Error inserting data:', error);
        res.status(500).send('Error in inserting');
        return;
      }
      console.log('Contact form submitted successfully', results);
      res.send('Contact form submitted successfully');
    });
  });
  
  // Define other routes as needed
  const server = app.listen(port, host, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`Server is listening at http://${host}:${port}`);
  });