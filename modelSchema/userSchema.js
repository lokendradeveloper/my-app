const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    email: {
      type: String,
      required: true,
      min: 6,
      max: 255,
      // unique:true
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 1024,
    },
    accessToken: { type: String, default: null },
    date: {
      type: Date,
      default: Date.now,
    },
    
  });
  
  module.exports = mongoose.model("users", userSchema);