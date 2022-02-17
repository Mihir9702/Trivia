require('dotenv/config');

const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGODB_LOCAL;

module.exports = MONGODB_URI;
