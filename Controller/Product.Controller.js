const productModule = require("../Model/ProductModel/productModel");

exports.productModule = async (req, res) => {
  
    req.body.User = req.user.id
    const product = await productModule.create(req.body)
    res.status(201).json({
      product
    })
};

exports.showAllProducts = async( req,res) => {
  const allProducts = await productModule.find()

  try {
    res.send(allProducts)
  } catch (error) {
    res.send(error)
  }
}
