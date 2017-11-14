var express = require('express');

//  Create our app
var app = express();
const  PORT = process.env.PORT || 3000;

// Heroku receives traffic via HTTPS.
// app.js listens HTTP . Therefore :
//  Forward https traffic to http, Using express midlleware
//  parameters:  ( request, response, what to do next )
app.use( function (req, res, next) {
    if(req.headers['x-forwarded-proto'] === 'https') {
      // redirect to HTTP listener.
      res.redirect("http://" + req.hostname + req.url);
    } else {
      next();      // nothing to do , call next()
    }
  });

app.use(express.static('dist'));

app.listen(PORT, function () {
  console.log('Express server is up on the port ' + PORT);
});
