const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
app.set('view engine','hbs');

app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url} `;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to log to server.log file');
    }
  });
  next();
});
//
// app.use((req,res,next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req,res) => {
  res.render('index.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to our home page!'
  });
});

app.get('/about',(req,res) => {
  res.render('about.hbs', {
    pageTitle: 'About page'
  });
});

app.get('/project', (req,res) => {
  res.render('project.hbs', {
    pageTitle: 'Project page'
  });
});

app.get('/bad',(req,res) => {
  res.send({
    errorMsg: 'Bad request'
  });
});
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
