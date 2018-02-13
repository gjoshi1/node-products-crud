//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Product = require('../api/models/product');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

//Our parent block
describe('Products', () => {
    beforeEach((done) => { //Before each test we empty the database
        Product.remove({}, (err) => {
           done();
        });
    });


    /*
      * Test the /GET route
      */
      describe('/GET product', () => {
          it('it should GET all the products', (done) => {
            chai.request(server)
                .get('/products')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                  done();
                });
          });
      });




    /*
      * Test the /POST route with missing name
      */
      describe('/POST product', () => {
          it('it should not POST a product without name field', (done) => {
            let product = {
                cost: 1.5,
                price: 2.0,
                stock:2
            }
            chai.request(server)
                .post('/products')
                .send(product)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('name');
                    res.body.errors.name.should.have.property('kind').eql('required');
                  done();
                });
          });

          it('it should POST a product ', (done) => {
              let product = {
                name:"Twinkies",
                cost: 1.5,
                price: 2.0,
                stock:2
              }
          chai.request(server)
                  .post('/products')
                  .send(product)
                  .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.a('object');
                      res.body.product.should.have.property('name');
                      res.body.product.should.have.property('cost');
                      res.body.product.should.have.property('price');
                      res.body.product.should.have.property('stock');
                    done();
                  });
            });
        });


        /*
          * Test the /GET/:id route
          */
          describe('/GET/:id product', () => {
              it('it should GET a product by the given id ', (done) => {
                let product = new Product({
                  name:"Twinkies",
                  cost: 1,
                  price: 2,
                  stock:2
                });
                  product.save((err, product) => {
                    chai.request(server)
                    .get('/products/' + product.id)
                    .send(product)
                    .end((err, res) => {

                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('name');
                        res.body.should.have.property('cost');
                        res.body.should.have.property('price');
                        res.body.should.have.property('stock');
                        res.body.should.have.property('_id').eql(product.id);
                      done();
                    });
                });

              });
          });

          /*
            * Test the /PUT/:id route
            */
            describe('/PUT/:id product', () => {
                it('it should UPDATE a product given the id', (done) => {
                  let product = new Product({name: "Mars", cost: 4, price: 5, stock: 1})
                  product.save((err, product) => {
                          chai.request(server)
                          .put('/products/' + product.id)
                          .send({name: "Mars", cost: 4.5, price: 5, stock: 1})
                          .end((err, res) => {
                              res.should.have.status(200);
                              res.body.should.be.a('object');
                              res.body.should.have.property('message').eql('Product updated!');
                              res.body.product.should.have.property('cost').eql(4.5);
                            done();
                          });
                    });
                });
            });

            /*
              * Test the /DELETE/:id route
              */
              describe('/DELETE/:id product', () => {
                  it('it should DELETE a product given the id', (done) => {
                    let product = new Product({name: "Mars", cost: 4, price: 5, stock: 1})
                    product.save((err, product) => {
                            chai.request(server)
                            .delete('/products/' + product.id)
                            .end((err, res) => {
                                res.should.have.status(200);
                                res.body.should.be.a('object');
                                res.body.should.have.property('message').eql('Product successfully deleted!');
                                
                              done();
                            });
                      });
                  });
              });
            });
