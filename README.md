# node-products-crud
Products CRUD Demo for Payroll Panda Test
=========================================

git repository:
==============
https://github.com/gjoshi1/node-products-crud.git

Running application locally:
===========================

npm run start

http://localhost:3000/products/

Testing application:
===================
npm test

Routes :
=======

Product CRUD Operations

List all products - HTTP Method : GET
http://localhost:3000/products/  

Create new product - HTTP Method : POST
http://localhost:3000/products/

Ex:{
    "name" : "Candy",
    "description" : "chocolate",
    "cost" : 1.66,
    "price" : 2.44,
     "stock" : 5

  }

Read a product : HTTP Method : GET
http://localhost:3000/products/:productId   

Update a product : HTTP Method : PUT
http://localhost:3000/products/:productId   

Ex:
http://localhost:3000/products/5a81e7762b383e31f2785e3a   
	{
	"_id" : "5a81e7762b383e31f2785e3a",
    "name" : "Candy",
    "description" : "chocolate",
    "cost" : 1.66,
    "price" : 2.44,
     "stock" : 5

  }

Delete a product : HTTP Method : DELETE
http://localhost:3000/products/:productId    

Fetch the price of these products in any currency : HTTP Method : GET
http://localhost:3000/products/getPrice/:productId/:currencyId'

Total cost and price for a given product : HTTP Method : GET
http://localhost:3000/products/getTotalCostAndPrice/:productId

Total cost and price for ALL products : HTTP Method : GET
http://localhost:3000/products/getTotalCostAndPrice


Currency Conversion Api:
======================

https://www.npmjs.com/package/open-exchange-rates#currency-conversion-with-moneyjs-fx-module
