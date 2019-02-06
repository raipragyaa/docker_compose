const express = require('express');
const request = require('request');
const app = express();
const PORT = 9000;
let services = [process.env.SERVICE1, process.env.SERVICE2];


app.use(express.urlencoded({extended: true}));

app.get('/', (req,res) => {
    request.get(`http://${services[0]}:8080${req.url}`, (err,response, body) => {
        res.send(body);
    });
    services = services.reverse();
});

app.get('/getNumber', (req,res) => {
    request.get(`http://${services[0]}:8080${req.url}`, (err, response, body) => {
        res.json(body);
    });
    services = services.reverse();
});

app.post('/postNumber', (req, res) => {
    request.post({
        headers: {'content-type' : 'application/x-www-form-urlencoded'},
        url:     `http://${services[0]}:8080${req.url}`,
        body:    `number=${req.body.number}`
    }, function(error, response, body){
        if(error){
            console.log(error);
        };
        res.end();
      });
      services = services.reverse();
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));      