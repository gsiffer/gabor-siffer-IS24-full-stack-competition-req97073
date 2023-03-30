import { products } from "../../../../data/products";

export default function handler(req, res) {
  console.log(req.query);
  const { productId } = req.query;
  const product = products.find(
    (product) => product.productId === parseInt(productId)
  );
  res.status(200).json(product);
}
