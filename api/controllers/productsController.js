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
  Product.find({}, function(err, productList) {
    if (err)
      res.send(err);

    res.json(productList);
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

exports.read_total_price_cost = function(req, res) {
  Product.find({}, function(err, productList) {
    if (err)
      res.send(err);

      console.log("read_total_price_cost");
      console.log(productList);

      var total_cost=0,total_price=0,prod_cost=0,prod_price=0;

      for(var product of productList){
        console.log(product);
          prod_cost = product.cost * product.stock;
          prod_price = product.price * product.stock;



          total_cost = total_cost + prod_cost;
          total_price = total_price + prod_price;

          console.log(prod_cost);
          console.log(prod_price);
          console.log(total_cost);
          console.log(total_price);
    }

    res.json({"total_cost":total_cost,"total_price":total_price});
  });
};


exports.read_total_product_price_cost = function(req, res) {
  Product.findById(req.params.productId, function(err, product) {
    if (err)
      res.send(err);
      console.log("read_total_product_price_cost");
      var total_cost = product.cost * product.stock;
      var total_price = product.price * product.stock;

    res.json({"product":product.name,"total_cost":total_cost,"total_price":total_price});
  });
};
