'use strict';
module.exports = function(app) {
  var products = require('../controllers/productsController');

  // todoList Routes
  app.route('/products')
    .get(products.list_all_products)
    .post(products.create_a_product);

  app.route('/products/getTotalCostAndPrice')
        .get(products.read_total_price_cost);

  app.route('/products/:productId')
    .get(products.read_a_product)
    .put(products.update_a_product)
    .delete(products.delete_a_product);

  app.route('/products/getPrice/:productId/:currencyId')
      .get(products.read_product_price);



  app.route('/products/getTotalCostAndPrice/:productId')
      .get(products.read_total_product_price_cost);



};
