'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  name : {type: String,
    required: 'Kindly enter the name of the product'},
  description: {
    type: String

  },
  cost: {
    type: Number,
    required: true

  },
  price: {
    type: Number,
    required: true

  },
  stock: {
    type: Number,
    default: 0,
    required: true 
  }
});

module.exports = mongoose.model('Product', ProductSchema);
