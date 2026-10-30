$dbContent = @'
const mongoose = require('mongoose');
const dns = require('dns');

// Force Google DNS (SRV/TXT issue fix)
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
dns.setDefaultResultOrder('ipv4first');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
'@

Set-Content -Path "config\db.js" -Value $dbContent -Encoding UTF8