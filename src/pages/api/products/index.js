import { products } from "../../../../data/products";
import { createId } from "@/helper";

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
  // GET request
  if (req.method === "GET") {
    try {
      if (req.url.includes("?")) {
        const filter = getRequest(req.query);
        res.status(200).json(filter);
      } else {
        res.status(200).json(products);
      }
    } catch (err) {
      res.status(500).json({ status: 500, msg: `${err}` });
    }
    // POST request
  } else if (req.method === "POST") {
    try {
      const product = postRequest(req.body.product);
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json({ status: 500, msg: `${err}` });
    }
    // DELETE request
  } else if (req.method === "DELETE") {
    try {
      const deletedProduct = deleteRequest(req.query);
      res.status(200).json(deletedProduct);
    } catch (err) {
      res.status(500).json({ status: 500, msg: `${err}` });
    }
    // PUT request
  } else if (req.method === "PUT") {
    try {
      const editProduct = putRequest(req.body.product);
      res.status(200).json(editProduct);
    } catch (err) {
      res.status(500).json({ status: 500, msg: `${err}` });
    }
  }
}

// Handle GET request
const getRequest = (query) => {
  const filteredScrumMaster = "scrum" in query ? query.scrum : "";
  const filteredDeveloper = "dev" in query ? query.dev : "";

  const filter = products.filter((product) =>
    filteredScrumMaster !== "" && filteredDeveloper === ""
      ? product.scrumMasterName === filteredScrumMaster
      : filteredDeveloper !== "" && filteredScrumMaster === ""
      ? product.developers.find(
          (developer) => developer === filteredDeveloper
        ) === filteredDeveloper
      : filteredScrumMaster !== "" && filteredDeveloper !== ""
      ? product.scrumMasterName === filteredScrumMaster &&
        product.developers.find(
          (developer) => developer === filteredDeveloper
        ) === filteredDeveloper
      : []
  );

  return filter;
};

// Handle POST request
const postRequest = (product) => {
  product = { ...product, productId: createId(products) };
  products.push(product);

  return product;
};

// Handle DELETE request
const deleteRequest = (productId) => {
  const deletedProduct = products.find(
    (product) => product.productId === parseInt(productId.id)
  );

  const index = products.findIndex(
    (product) => product.productId === parseInt(productId.id)
  );
  products.splice(index, 1);

  return deletedProduct;
};

// Handle PUT request
const putRequest = (product) => {
  const editProduct = product;

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

  return editProduct;
};
