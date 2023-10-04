const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.token = require("./token.model");
db.role = require("./role.model");
db.post = require("./post.model");
db.role = require("./role.model");

module.exports = db;