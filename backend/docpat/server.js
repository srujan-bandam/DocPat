const https = require('https');
const fs = require('fs');
const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config');

require('dotenv').config({ path: '.env' });
require('aws-sdk/lib/maintenance_mode_message').suppress = true;

const key = fs.readFileSync('./certificates/key.pem', 'utf8');
const cert = fs.readFileSync('./certificates/cert.pem', 'utf8');

const options = {
  key: key,
  cert: cert
};

const server = https.createServer(options, app);

const PORT = process.env.PORT || 3000;



mongoose.connect(process.env.DB_URI)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is running on https://localhost:${config.PORT}`);
    });
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });

