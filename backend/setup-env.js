#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const envPath = path.join(__dirname, ".env");
const envContent = `PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/ticket-agent
`;

if (!fs.existsSync(envPath)) {
    fs.writeFileSync(envPath, envContent);
    console.log("✅ Created .env file with default configuration");
    console.log("📝 You can modify the .env file to change MongoDB URI or port");
} else {
    console.log("⚠️  .env file already exists");
}

console.log("\n🔧 To fix the DNS error, make sure:");
console.log("1. MongoDB is installed and running on your system");
console.log("2. Run: mongod (to start MongoDB server)");
console.log("3. Or use MongoDB Atlas cloud service");
console.log("\n📖 For MongoDB installation: https://docs.mongodb.com/manual/installation/");
