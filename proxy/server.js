const express = require('express');
const app = express();
const httpProxy = require('http-proxy');
const request = require('request');
const PORT = 9000;
let counter = 1;
let services = process.env.SERVICES.split(',');
let healthyServices = services;

let getHealthyservices = function(){
    healthyServices = [];
    services.forEach(service => {
       request.get(`${service}/health`, (err, res) => {
           if (res && res.statusCode === 200){
               healthyServices.push(service);
           };
       });
    });
};

setInterval(getHealthyservices,1000);

app.use((req, res) => {
    const proxyServer = httpProxy.createProxyServer({ target: healthyServices[counter % healthyServices.length] });
    proxyServer.on('error', () => res.end());
    counter++;
    proxyServer.proxyRequest(req, res);
});

app.listen(PORT, () => console.log(`Proxy is listening on port ${PORT}`));      

