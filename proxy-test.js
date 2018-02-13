const https = require('https');
const express = require('express');
const app = express();
const httpProxy = require('http-proxy');
// const apiProxy = httpProxy.createProxyServer();

// const targetServer = 'https://2sgna3v0s6.execute-api.eu-central-1.amazonaws.com/Prod/api/phone';

// app.all('*', (req, res) => {
//   console.log(`Redirect to ${targetServer}`);
//   apiProxy.web(req, res, {
//     secure: false,
//     target: targetServer
//   });
// });


// app.listen(3000);
// console.log('The server start at 127.0.0.1:3000');

httpProxy.createProxyServer({
  target: 'https://2sgna3v0s6.execute-api.eu-central-1.amazonaws.com/Prod/api/phone',
  agent: https.globalAgent,
  headers: {
    host: '2sgna3v0s6.execute-api.eu-central-1.amazonaws.com'
  }
}).listen(3000);
