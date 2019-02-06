const express = require('express');
const request = require('request');
const app = express();
const PORT = 9000;
let services = [process.env.SERVICE1, process.env.SERVICE2];


app.use(express.urlencoded({extended: true}));

app.get('/', (req,res) => {
    console.log("======================= ", services[0]);
    request.get(`http://${services[0]}:8080${req.url}`, (err,response, body) => {
        console.log(body);
        res.send(body) });
});

app.get('/getNumbers', (req,res) => {
    request.get(`http://${services[0]}:8080${req.url}`, (err, response, body) => {
        res.send(body);
    })
});

app.post('/postNumber', (req, res) => {
    request.post(`http://${services[0]}:8080${req.url}`)
});

app.listen(PORT, () => console.log("Forwarding to another port"));