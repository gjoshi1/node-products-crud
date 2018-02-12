'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Will add the Currency type to the Mongoose Schema types


var ProductSchema = new Schema({
  name : {type: String,
    required: 'Kindly enter the name of the product'},
  description: {
    type: String

  },
  cost: {
    type: Number

  },
  price: {
    type: Number

  },
  stock: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Products', ProductSchema);
