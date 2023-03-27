import { products } from "../../../../data/products";

export default function handler(req, res) {
  if (req.method === "GET") {
    console.log("GET - 200");
    res.status(200).json(products);
  } else if (req.method === "POST") {
    console.log("POST - 201");
    const product = req.body.product;
    products.push(product);
    res.status(201).json(product);
  }
}
