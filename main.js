#!/bin/env node

// Setup env
process.env.ROOT_URL = process.env.OPENSHIFT_APP_DNS || "localhost";
process.env.MONGO_URL = (process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME) || "mongodb://localhost:27017/";
process.env.PORT = process.env.OPENSHIFT_INTERNAL_PORT || 8000;
process.env.IP = process.env.OPENSHIFT_INTERNAL_IP || '0.0.0.0';

// Show connection details on startup
console.log("MONGO_URL IS: " + process.env.MONGO_URL);
console.log("ROOT_URL IS: " + process.env.ROOT_URL);
console.log("PORT: " + process.env.PORT);
console.log("IP: " + process.env.IP);

// Start meteor server
require(require('path').join(__dirname, 'server', 'server.js'));
