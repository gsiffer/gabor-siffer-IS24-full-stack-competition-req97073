import React from "react";
import { useState, useEffect } from "react";
import BasicButton from "@/components/BasicButton";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Product from "@/components/Product";
import SlidingPanel from "@/components/SlidingPanel";
import Close from "@/components/icons/Close";

const Products = () => {
  const MAX_DEVELOPERS = 5;
  const [products, setProducts] = useState([]);
  const [isPanelSlide, setIsPanelSlide] = useState(false);
  const [isNewProduct, setIsNewProduct] = useState(false);
  const [isEditProduct, setIsEditProduct] = useState(false);

  const [formData, setFormData] = useState({
    productId: 0,
    productName: "",
    productOwnerName: "",
    developers: [],
    scrumMasterName: "",
    startDate: "",
    methodology: "",
  });

  const methodologies = [
    { value: "Agile", label: "Agile" },
    { value: "Waterfall", label: "Waterfall" },
  ];

  const developers = [
    {
      value: "Dave Dev",
      label: "Dave Dev",
    },
    {
      value: "Gabor Dev",
      label: "Gabor Dev",
    },
    {
      value: "Kristin Dev",
      label: "kristin Dev",
    },
    {
      value: "Tristan Dev",
      label: "Tristan Dev",
    },
    {
      value: "Chris Dev",
      label: "Chris Dev",
    },
    {
      value: "Steve Dev",
      label: "Steve Dev",
    },
  ];

  const scrumMasters = [
    { value: "Steve Master", label: "Steve Master" },
    { value: "Bob Master", label: "Bob Master" },
    { value: "Gabor Master", label: "Gabor Master" },
  ];

  const productOwners = [
    { value: "Steve Owners", label: "Steve Owners" },
    { value: "Bob Owners", label: "Bob Owners" },
    { value: "Gabor Owners", label: "Gabor Owners" },
  ];

  useEffect(() => {
    const getProducts = async () => {
      const res = await fetchProducts();
      setProducts(res);
    };
    getProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:3000/api/products");
    const data = await res.json();
    return data;
  };

  const addProduct = async (product) => {
    const res = await fetch("http://localhost:3000/api/products", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ product }), // converts a JavaScript value to a JSON string
    });
    const data = await res.json();
    setProducts([...products, data]);
  };

  const handleChangeDevelopers = (e) => {
    setFormData({
      ...formData,
      developers: Array.isArray(e) ? e.map((x) => x.value) : [],
    });
  };

  const handleChangeStartDate = (date) => {
    if (date != null) {
      const year = date.getUTCFullYear().toString();

      const month =
        (date.getMonth() + 1).toString().length < 2
          ? "0" + (date.getMonth() + 1).toString()
          : (date.getMonth() + 1).toString();

      const day =
        date.getDate().toString().length < 2
          ? "0" + date.getDate().toString()
          : date.getDate().toString();

      setFormData({ ...formData, startDate: `${year}/${month}/${day}` });
    } else {
      setFormData({ ...formData, startDate: "" });
    }
  };

  const handleClickCancel = (e) => {
    e.preventDefault();
    setIsPanelSlide(false);
    setIsNewProduct(false);
    setIsEditProduct(false);

    // Object.keys(formData).map((item, index) => console.log(formData[item]));
  };

  const handleClickNewProduct = () => {
    setIsPanelSlide(true);
    setIsNewProduct(true);

    setFormData({
      ...formData,
      productId: createId(products),
    });
  };

  const createId = (products) => {
    const productIds = [];
    products.map((product) => productIds.push(product.productId));

    return Math.max(...productIds) + 1;
  };

  const handleClickEditProduct = (id) => {
    setIsPanelSlide(true);
    setIsEditProduct(true);
    console.log(id);
  };

  const handleClickSave = (e) => {
    e.preventDefault();

    setIsPanelSlide(false);
    setIsNewProduct(false);
    setIsEditProduct(false);

    addProduct(formData);
  };

  const handleClickDeleteProduct = (id) => {
    console.log(id);
  };

  const setProductToEmpty = () => {};

  return (
    <>
      <div className="flex justify-end">
        <BasicButton name="NEW PRODUCT" handleClick={handleClickNewProduct} />
      </div>

      <table className="table-fixed border-spacing-10 border-gray-100 w-full mt-2">
        <thead className="sticky top-0 z-10">
          <tr className="bg-gray-200 h-10">
            <th className="w-[5%] text-center">ID</th>
            <th className="w-[15%] text-left">Product Name</th>
            <th className="w-[15%] text-left">Product Owner</th>
            <th className="w-[15%] text-left">Developer(s)</th>
            <th className="w-[15%] text-left">Scrum Master</th>
            <th className="w-[13%] text-center">Start Date</th>
            <th className="w-[14%] text-center">Methodology</th>
            <th className="w-[5%] text-center">Edit</th>
            <th className="w-[5%] text-center">Del</th>
          </tr>
        </thead>
        {/* Generates the product table rows */}
        <tbody>
          {products.map((product) => (
            <Product
              key={product.productId}
              product={product}
              handleClickEdit={handleClickEditProduct}
              handleClickDelete={handleClickDeleteProduct}
            />
          ))}
        </tbody>
      </table>
      {/* Sliding panel to add a new product or edit a product  */}
      <SlidingPanel isPanelSlide={isPanelSlide}>
        <div className="flex justify-between">
          <h2 className="text-lg font-medium text-gray-900 mb-10 mt-2">
            {isNewProduct ? "Add New Product" : "Edit Product"}
          </h2>
          {/* 'X' button on the sliding panel */}
          <button
            type="button"
            className="
                  w-10
                  h-10
                  flex
                  items-center
                  justify-end
                  text-gray-400
                  hover:text-gray-500
                "
            onClick={handleClickCancel}
          >
            <Close />
          </button>
        </div>
        {/* Form elements to add or edit a product */}
        <form className="flex flex-col justify-between h-[550px]">
          {/* ID field */}
          <div className="flex flex-col">
            <label>ID</label>
            <input
              className="border rounded h-[36px] bg-gray-100 font-semibold"
              type="text"
              value={formData.productId || ""}
              readOnly
              disabled
            ></input>
          </div>
          {/* Product Name input field */}
          <div className="flex flex-col">
            <label>Product Name</label>
            <input
              className="border rounded h-[36px]"
              type="text"
              placeholder="Product Name"
              onChange={(e) =>
                setFormData({ ...formData, productName: e.target.value })
              }
            ></input>
          </div>
          {/* Product Owner drop-down list */}
          <div>
            <label>Product Owner</label>
            <Select
              id="long-value-select"
              instanceId="long-value-select"
              options={productOwners}
              value={productOwners.filter((obj) =>
                formData.productOwnerName.includes(obj.value)
              )} // set selected values
              onChange={(e) =>
                setFormData({ ...formData, productOwnerName: e.value })
              }
            />
          </div>
          {/* Developers drop-down list */}
          <div>
            <label>Developers</label>
            <Select
              id="long-value-select"
              instanceId="long-value-select"
              className="dropdown"
              placeholder={`Select Options (max. ${MAX_DEVELOPERS})`}
              value={developers.filter((obj) =>
                formData.developers.includes(obj.value)
              )} // set selected values
              options={developers} // set list of the data
              onChange={handleChangeDevelopers}
              // assign onChange function
              isOptionDisabled={() =>
                formData.developers.length >= MAX_DEVELOPERS
              } // only allow user to choose up to 5 options
              isMulti
              isClearable
            />
          </div>
          {/* Scrum Master drop-down list */}
          <div>
            <label>Scrum Master</label>
            <Select
              id="long-value-select"
              instanceId="long-value-select"
              options={scrumMasters}
              value={scrumMasters.filter((obj) =>
                formData.scrumMasterName.includes(obj.value)
              )} // set selected values
              onChange={(e) =>
                setFormData({ ...formData, scrumMasterName: e.value })
              }
            />
          </div>
          {/* Start Date date picker */}
          <div>
            <label>Start Date</label>
            <DatePicker
              className="border h-[36px] rounded w-full"
              selected={Date.parse(formData.startDate)}
              onChange={(date) => {
                handleChangeStartDate(date);
              }}
              dateFormat="yyyy/MM/dd"
              // minDate={new Date()}
              placeholderText={"Select..."}
              isClearable
              showYearDropdown
              scrollableMonthYearDropdown
            />
          </div>
          {/* Methodology drop-down list */}
          <div>
            <label>Methodology</label>
            <Select
              id="long-value-select"
              instanceId="long-value-select"
              options={methodologies}
              value={methodologies.filter((obj) =>
                formData.methodology.includes(obj.value)
              )} // set selected values
              onChange={(e) =>
                setFormData({ ...formData, methodology: e.value })
              }
            />
          </div>
          {/* Save and Cancel buttons */}
          <div className="flex justify-end mt-2">
            <BasicButton
              handleClick={handleClickSave}
              name="SAVE"
              style="mr-2"
            />
            <BasicButton name="CANCEL" handleClick={handleClickCancel} />
          </div>
        </form>
      </SlidingPanel>

      <pre>{JSON.stringify(formData)}</pre>
    </>
  );
};

export default Products;
