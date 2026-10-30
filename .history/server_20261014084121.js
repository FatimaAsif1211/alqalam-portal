const express = require('express');
const dotenv = require('dotenv');
const dns = require('dns');
const connectDB = require('./config/db');

dotenv.config();

// Force Google DNS for Node.js (SRV issue fix)
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
dns.setDefaultResultOrder('ipv4first');

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ 
    message: 'Al-Qalam Portal API chal raha hai',
    status: 'OK',
    timestamp: new Date()
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});