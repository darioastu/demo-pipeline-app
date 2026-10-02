const express = require('express');
const app = express();

app.get('/', (req, res) => res.json({ message: 'Hola desde el pipeline!', version: process.env.APP_VERSION || 'dev' }));
app.get('/health', (req, res) => res.status(200).send('OK'));

module.exports = app;
