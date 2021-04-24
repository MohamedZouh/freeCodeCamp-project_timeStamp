// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/", (req, res)=>{
  res.json({unix:(+new Date()), utc: new Date().toString()});
})

app.get("/api/:date", (req, res)=>{
  var date = req.params.date;
  if(/\d{5,}/.test(date)){
    const intdate = parseInt(date);
    res.json({unix: intdate, utc: new Date(intdate).toUTCString()});
  }
  else{
    const objectdate = new Date(date)
    if(objectdate.toString()=="Invalid Date"){
      res.json({err: 'Invalid Date'})
    }
    else{
      res.json({unix: objectdate.valueOf(), utc: objectdate.toUTCString()});
    }
    
  }
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
}); 
