import { products } from "../../../../data/products";

export default function handler(req, res) {
  if (req.method === "GET") {
    try {
      const productId = req.query.productId;
      const product = products.find(
        (product) => product.productId === parseInt(productId)
      );
      res.status(200).json(product);
    } catch {
      res.status(500).json({ status: 500, msg: `${err}` });
    }
  } else if (req.method === "DELETE") {
    try {
      const deletedProduct = deleteRequest(req.query.productId);
      res.status(200).json(deletedProduct);
    } catch (err) {
      res.status(500).json({ status: 500, msg: `${err}` });
    }
  }
}

// Handle DELETE request
const deleteRequest = (productId) => {
  const deletedProduct = products.find(
    (product) => product.productId === parseInt(productId)
  );

  const index = products.findIndex(
    (product) => product.productId === parseInt(productId)
  );

  index !== -1 && products.splice(index, 1);

  return deletedProduct;
};
