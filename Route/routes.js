const Controller = require('../Controller/Controller')
const productController = require('../Controller/Product.Controller')
const express = require('express')
const routes = express.Router()


routes.get('/', Controller.testServer)

// ********** user API **********//

routes.post('/user/signup', Controller.userSignUp)
routes.post('/user/signin', Controller.userSignIn)


// *********** Product API **************//

routes.post('/allProducts', productController.productModule)


module.exports = routes