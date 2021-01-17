const express = require('express'); 
const bodyParser = require('body-parser'); // middleware


const app = express(); // Create an ExpressJS app
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/index.html');
  });


  app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/static/login.html');
  });


  app.post('/login', (req, res) => {
    // Insert Login Code Here
    let username = req.body.username;
    let password = req.body.password;

    if (username === "admin" && password === "admin"){
        res.status(200).send('login success');
    }
    res.status(400).send('login failed');
  });

  const port = 3000 // Port we will listen on

// Function to listen on the port
app.listen(port, () => console.log(`This app is listening on port ${port}`));