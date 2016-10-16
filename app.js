var express = require('express');
var path = require('path');
var app = express();
require('es6-promise').polyfill();
require('node-fetch');


// Define the port to run on
app.set('port', process.env.PORT || 5000);
app.use(express.static(path.join(__dirname, 'public')));
// Listen for requests
app.use('/forecast', require('./server/routes/forecast.routes'));
app.listen(app.get('port'), function() {
  console.log('Express web server is listening on port ' + app.get('port'));
});
