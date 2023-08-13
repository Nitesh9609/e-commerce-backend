const Controller = require('../Controller/Controller')
const productController = require('../Controller/Product.Controller')
const express = require('express')
const routes = express.Router()
const auth = require('../Route/auth-route')

routes.get('/', Controller.testServer)

// ********** user API **********//

routes.post('/user/signup', Controller.userSignUp)
routes.post('/user/signin', Controller.userSignIn)
routes.post('/password/reset', Controller.forgetPassword)
routes.put('/resetPassword/:token', Controller.resetPassword)

// *********** Product API **************//

routes.post('/allProducts',auth.verified,auth.authorizeRoles("admin"), productController.productModule)
routes.get('/getAllProducts',auth.verified,auth.authorizeRoles("admin"), productController.showAllProducts)



module.exports = routes