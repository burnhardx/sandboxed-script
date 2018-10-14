const express = require('express');
const app = express();
var exports = module.exports = {};
app.use(express.static('test/context'));
var server = app.listen(8080, ()=>{});

exports.closeServer = function(){
    server.close();
};