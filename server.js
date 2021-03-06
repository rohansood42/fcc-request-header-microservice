var express = require('express');
var accepts = require('accepts');
var platform = require('platform');
var app = express();

app.get('/', function (req, res) {
  var ip;
  var info = platform.parse(req.headers['user-agent']);
  if (req.headers['x-forwarded-for']) {
    ip = req.headers['x-forwarded-for'].split(",")[0];
  } else if (req.connection && req.connection.remoteAddress) {
    ip = req.connection.remoteAddress;
  } else {
    ip = req.ip;
  }
  var locale = accepts(req).languages();
  
  var retobj = {
    ipaddress:ip,
    language:locale[0],
    software:info.os.toString()
  };
  res.send(retobj);
});

app.listen(process.env.PORT || 8080, function () {
  console.log('Example app listening on port 8080!');
});
