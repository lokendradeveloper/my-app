const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/e-comm');
const secret = "bezkoder-secret-key";
module.exports ={secret}