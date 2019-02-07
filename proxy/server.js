const express = require('express');
const app = express();
const httpProxy = require('http-proxy');
const PORT = 9000;
let counter = 1;
let services = process.env.SERVICES.split(',') || ['http://myapp:8080'];

app.use((req, res) => {
    const proxyServer = httpProxy.createProxyServer({ target: services[counter % services.length] });
    proxyServer.on('error', () => res.end());
    counter++;
    proxyServer.proxyRequest(req, res);
});

app.listen(PORT, () => console.log(`Proxy is listening on port ${PORT}`));      