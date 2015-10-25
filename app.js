var express    = require('express');
var bodyParser = require('body-parser');
var appEnv     = require('cfenv').getAppEnv();

var app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static('public'));
app.set('appPath', '/public');

// Root requests default to sending the index.html file
app.get('/', function(req, res) {
  res.sendfile('index.html');
});

// Handle POSTs
app.post('/index_submit', function(req, res) {
  var postString = req.body.postString;
  console.log('The string "%s" was sent from the form.', postString);
  res.end('successfully posted "' + postString + '"');
});

// start the server on the given port and binding host, and print
// url to server when it starts
app.listen(appEnv.port, appEnv.bind, function() {
  console.log("server starting on " + appEnv.url);
});
