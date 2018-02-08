'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Will add the Currency type to the Mongoose Schema types
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var ProductSchema = new Schema({
  name : {type: String,
    required: 'Kindly enter the name of the product'},
  description: {
    type: String

  },
  cost: {
    type: Currency

  },
  price: {
    type: Currency

  },
  stock: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Products', ProductSchema);
