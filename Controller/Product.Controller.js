const productModule = require("../Model/ProductModel/productModel");

exports.productModule = (req, res) => {
  

 

    const post = new productModule({
      // id: req.body.id,
      // image: req.body.image,
      // name: req.body.name,
      // brand: req.body.branch,
      // price: req.body.proce,
      // discount: req.body.discount,
      // type: req.body.type,
      // category: req.body.category,
      // quantity: req.body.quantity ,
      product: req.body.product
    });


    post.save()
    .then(data => {res.send(data)})
    .catch(err => {res.send(err)})
};
