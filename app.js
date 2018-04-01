const path = require('path');
const express = require('express');
const httpPort = 3002;

let acePath = path.resolve(require.resolve('ace-builds'), '../../src-min-noconflict');

app = express();
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.static(path.resolve(acePath)));

app.listen(httpPort);
console.log("Running on port:", httpPort)
