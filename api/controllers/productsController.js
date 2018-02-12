'use strict';


var mongoose = require('mongoose'),
  Product = mongoose.model('Products');

  //Currency conversion with money.js (fx) module
var oxr = require('open-exchange-rates'),
	fx = require('money');

oxr.set({ app_id: 'a08f7417c15447b2901afc1291b95a4d' })

oxr.latest(function() {
	// Apply exchange rates and base rate to `fx` library object:
	fx.rates = oxr.rates;
	fx.base = oxr.base;

});

//Currency conversion

exports.list_all_products = function(req, res) {
  Product.find({}, function(err, product) {
    if (err)
      res.send(err);

    res.json(product);
  });
};




exports.create_a_product = function(req, res) {
  var new_product = new Product(req.body);

  new_product.save(function(err, product) {
    if (err)
      res.send(err);
    res.json(product);
  });
};


exports.read_a_product = function(req, res) {
  Product.findById(req.params.productId, function(err, product) {
    if (err)
      res.send(err);


    res.json(product);
  });
};

exports.read_product_price = function(req, res) {
  Product.findById(req.params.productId, function(err, product) {
    if (err)
      res.send(err);


    	// money.js is ready to use:
    	var val = fx(product.price).from('USD').to(req.params.currencyId); // ~8.0424
      console.log(val);
    res.json(val);
  });
};

exports.update_a_product = function(req, res) {
  Product.findOneAndUpdate({_id: req.params.productId}, req.body, {new: true}, function(err, product) {
    if (err)
      res.send(err);
    res.json(product);
  });
};


exports.delete_a_product = function(req, res) {


  Product.remove({
    _id: req.params.productId
  }, function(err, product) {
    if (err)
      res.send(err);
    res.json({ message: 'Product successfully deleted' });
  });
};
