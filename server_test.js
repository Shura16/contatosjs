/*eslint-env node */

/*globals express */

var express = require('express');
var app = express();
app.use(express.static('app'));
app.listen(process.env.PORT || 8081);