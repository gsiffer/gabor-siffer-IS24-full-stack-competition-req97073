import { products } from "../../../../data/products";

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(products);
  } else if (req.method === "POST") {
    const product = req.body.product;
    products.push(product);
    res.status(201).json(product);
  } else if (req.method === "DELETE") {
    const { productId } = req.query;
    console.log(req.query);
    const deletedProduct = products.find(
      (product) => product.productId === parseInt(productId)
    );

    const index = products.findIndex(
      (product) => product.productId === parseInt(productId)
    );

    products.splice(index, 1);

    res.status(200).json(deletedProduct);
  }
}

// const {productId} = req.query
// const product = products.find((product => product.id === parseInt(productId)))
