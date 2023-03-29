import { products } from "../../../../data/products";

/**
 * @swagger
 * /api/products:
 *   get:
 *     description: Returns the hello world
 *     responses:
 *       200:
 *         description: hello world
 */
export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(products);
  } else if (req.method === "POST") {
    const product = req.body.product;
    products.push(product);
    res.status(201).json(product);
  } else if (req.method === "DELETE") {
    const productId = req.query;
    
    const deletedProduct = products.find(
      (product) => product.productId === parseInt(productId.id)
    );

    const index = products.findIndex(
      (product) => product.productId === parseInt(productId.id)
    );
    products.splice(index, 1);

    res.status(200).json(deletedProduct);
  } else if (req.method === "PUT") {
    const editProduct = req.body.product;

    const index = products.findIndex(
      (product) => product.productId === parseInt(editProduct.productId)
    );

    products[index] = {
      ...products[index],
      productName: editProduct.productName,
      productOwnerName: editProduct.productOwnerName,
      developers: editProduct.developers,
      scrumMasterName: editProduct.scrumMasterName,
      startDate: editProduct.startDate,
      methodology: editProduct.methodology,
    };

    res.status(200).json(editProduct);
  }
}
