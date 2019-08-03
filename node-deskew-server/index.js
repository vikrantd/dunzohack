const express = require('express')
var fs = require('fs'),
request = require('request');
const app = express();
bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use('/public', express.static('public'))

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
//    console.log('content-type:', res.headers['content-type']);
//    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

app.post('/', (req, res) => {
    tmpFileName = 'public/'+Date.now() + '.jpeg';
    console.log(req.body);
    download(req.body.image, tmpFileName, function(){
        const { spawn } = require('child_process');
        const pyProg = spawn('python', ['../deskew/deskew.py', "-i", tmpFileName, "-o", tmpFileName, "-r", 0]);
//      console.log(pyProg);

        pyProg.stdout.on('data', function(data) {
            console.log(data.toString());
            let response = {};
            response.image = "http://34.93.117.224/"+data.toString();
            response.image = response.image.substring(0, response.image.length - 1);
            res.jsonp(response);
            res.end();
        });
    })
})

app.listen(4000, () => console.log('Application listening on port 4000!'))