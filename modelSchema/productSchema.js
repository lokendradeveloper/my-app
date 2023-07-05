const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: String,
    price: Number,
    brand: String,
    category : String,
    description : String,
    rating : {
        rate:Number,
        count:Number
    },
    image: {
        type: String,
        required: false,
      }, 
},
{
    timestamps: true,
    versionKey: false,
  }
);
module.exports = mongoose.model('products', productSchema)

