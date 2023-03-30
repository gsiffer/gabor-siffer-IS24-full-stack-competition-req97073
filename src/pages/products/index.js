import React from "react";
import { useState, useEffect } from "react";
import BasicButton from "@/components/BasicButton";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Product from "@/components/Product";
import SlidingPanel from "@/components/SlidingPanel";
import CloseIcon from "@/components/icons/CloseIcon";
import { createId } from "@/helper";
import ErrorMessage from "@/components/ErrorMessage";

const Products = () => {
  /* Stores the maximum number of people who can be selected
  from the developers drop-down list on the form*/
  const MAX_DEVELOPERS = 5;
  // Stores the filtered drop-down list names
  const FILTERED_FIELDS_NAMES = {
    scrumMasters: "scrumMasters",
    developers: "developers",
  };
  // Stores an empty product object
  const EMPTY_PRODUCT = {
    productId: 0,
    productName: "",
    productOwnerName: "",
    developers: [],
    scrumMasterName: "",
    startDate: "",
    methodology: "",
  };
  // Store all product objects
  const [products, setProducts] = useState([]);
  // Store all developers name for the drop-down list on the form
  const [developers, setDevelopers] = useState([]);
  // Store all scrum masters name for the drop-down list on the form
  const [scrumMasters, setScrumMasters] = useState([]);
  // Store all product owners name for the drop-down list on the form
  const [productOwners, setProductOwners] = useState([]);
  // Switcher to handle the right panel sliding effect
  const [isPanelSlide, setIsPanelSlide] = useState(false);
  // Switcher to track if the 'New Product' button was clicked
  const [isNewProduct, setIsNewProduct] = useState(false);
  // Switcher to track if the edit product icon button was clicked
  const [isEditProduct, setIsEditProduct] = useState(false);
  // Switcher to track if the 'Save' button was clicked on the form
  const [isSaveClicked, setIsSaveClicked] = useState(false);
  // Store a product object from the form. Initial value is an empty product.
  const [formData, setFormData] = useState(EMPTY_PRODUCT);
  // Store scrum master selected from drop-down filter
  const [filteredScrumMaster, setFilteredScrumMaster] = useState("");
  // Store developer selected from drop-down filter
  const [filteredDeveloper, setFilteredDeveloper] = useState("");
  // Switcher to track if the product table is filtered
  const [isFiltered, setIsFiltered] = useState(false);
  // Store all filtered product objects
  const [filteredProducts, setFilteredProducts] = useState([]);
  // Store a new product row id to scroll to the element
  const [scrollElementId, setScrollElementId] = useState("");

  const methodologies = [
    { value: "Agile", label: "Agile" },
    { value: "Waterfall", label: "Waterfall" },
  ];

  // Get all products upon initial loading of the page
  useEffect(() => {
    const getProducts = async () => {
      const res = await fetchProducts();
      setProducts(res);
    };
    getProducts();
  }, []);

  /* Get all developers, scrum masters and product owners
  upon initial loading of the page*/
  useEffect(() => {
    const getEmployees = async () => {
      const res = await fetchEmployees();
      setDevelopers(res[0].developers);
      setScrumMasters(res[0].scrumMasters);
      setProductOwners(res[0].productOwners);
    };
    getEmployees();
  }, []);

  /* */
  useEffect(() => {
    const filterProducts = () => {
      isFiltered && handleFilter();
    };
    filterProducts();
  }, [filteredScrumMaster, filteredDeveloper, products]);

  useEffect(() => {
    const scrollToElement = () => {
      document
        .getElementById(`row_${scrollElementId}`)
        ?.scrollIntoView({ behavior: "smooth" });
    };
    scrollToElement();
  }, [products.length]);

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:3000/api/products");
    const data = await res.json();
    return data;
  };

  const fetchEmployees = async () => {
    const res = await fetch("http://localhost:3000/api/employees");
    const data = await res.json();
    return data;
  };

  const addProduct = async (product) => {
    // const data = await fetcher("", "post", product)
    const res = await fetch("http://localhost:3000/api/products", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ product }), // converts a JavaScript value to a JSON string
    });

    if (res.status === 201) {
      const data = await res.json();
      setProducts([...products, data]);
      setScrollElementId(data.productId);
    } else {
      alert("Something went wrong!");
    }
  };

  const deleteProduct = async (id) => {
    console.log(id);
    const res = await fetch(`http://localhost:3000/api/products?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    if (res.status === 200) {
      setProducts(products.filter((product) => product.productId !== id));
      setScrollElementId("");
    } else {
      alert("Something went wrong!");
    }
  };

  const updateProduct = async (product) => {
    const res = await fetch(`http://localhost:3000/api/products`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ product }),
    });

    if (res.status === 200) {
      const data = await res.json();
      setProducts(
        products.map((product) =>
          product.productId === data.productId ? data : product
        )
      );
    } else {
      alert("Something went wrong!");
    }
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
    clearFormData();
  };

  const clearFormData = () => {
    setIsPanelSlide(false);
    setIsNewProduct(false);
    setIsEditProduct(false);
    setIsSaveClicked(false);
    setFormData(EMPTY_PRODUCT);
  };

  const handleClickNewProduct = () => {
    setIsPanelSlide(true);
    setIsNewProduct(true);
    handleClickClearFilters();

    setFormData({
      ...formData,
      productId: createId(products),
    });
  };

  const handleClickEditProduct = (product) => {
    setIsPanelSlide(true);
    setIsEditProduct(true);
    setFormData(product);
  };

  const handleClickSave = (e) => {
    e.preventDefault();
    setIsSaveClicked(true);

    if (formValidation()) {
      isNewProduct ? addProduct(formData) : updateProduct(formData);
      clearFormData();
    }
  };

  const formValidation = () => {
    if (
      formData.productName.trim().length === 0 ||
      formData.productOwnerName.length === 0 ||
      formData.developers.length === 0 ||
      formData.scrumMasterName.length === 0 ||
      formData.startDate.length === 0 ||
      formData.methodology.length === 0
    ) {
      return false;
    }
    return true;
  };

  const handleFilter = () => {
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

    setFilteredProducts(filter);
  };

  const handleChangeFilter = (e, filteredField) => {
    filteredField === FILTERED_FIELDS_NAMES.scrumMasters
      ? setFilteredScrumMaster(e.value)
      : setFilteredDeveloper(e.value);

    setIsFiltered(true);
  };

  const handleClickClearFilters = () => {
    setFilteredScrumMaster("");
    setFilteredDeveloper("");
    setIsFiltered(false);
  };

  const dropDownValidationStyle = {
    control: (base, state) => ({
      ...base,
      borderColor: "red",
    }),
  };

  return (
    <>
      {/* FILTER PRODUCTS SECTION */}
      <div className="flex justify-between">
        <div className="flex">
          {/* Select Scrum Master drop-down list */}
          <div>
            <div>
              <label>Select Scrum Master</label>
            </div>
            <Select
              className="w-[200px] z-15"
              id="long-value-select"
              instanceId="long-value-select"
              options={scrumMasters}
              value={scrumMasters.filter((obj) =>
                filteredScrumMaster.includes(obj.value)
              )}
              onChange={(e) =>
                handleChangeFilter(e, FILTERED_FIELDS_NAMES.scrumMasters)
              }
            />
          </div>
          {/* Select Developer drop-down list */}
          <div className="ml-[10px]">
            <div>
              <label>Select Developer</label>
            </div>
            <Select
              className="z-15 w-[200px]"
              id="long-value-select"
              instanceId="long-value-select"
              options={developers}
              value={developers.filter((obj) =>
                filteredDeveloper.includes(obj.value)
              )}
              onChange={(e) =>
                handleChangeFilter(e, FILTERED_FIELDS_NAMES.developers)
              }
            />
          </div>
          {/* Clear all filters button */}
          <BasicButton
            name="CLEAR FILTERS"
            style="max-h-[40px] mt-auto ml-[10px]"
            handleClick={handleClickClearFilters}
          />
        </div>
        <div className="mt-auto">
          <p className="font-medium p-2">
            Number of Products:
            <span className="p-2">
              {isFiltered ? filteredProducts.length : products.length}
            </span>
          </p>
        </div>
        <BasicButton
          name="NEW PRODUCT"
          style="max-h-[40px] mt-auto"
          handleClick={handleClickNewProduct}
        />
      </div>

      {/* PRODUCTS TABLE/LIST SECTION */}
      <div className="overflow-y: scroll overflow-auto max-h-[650px] border-b">
        <table className="table-fixed border-spacing-10 border-gray-100 w-full mt-2">
          <thead className="sticky top-0">
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
            {!isFiltered
              ? products.map((product) => (
                  <Product
                    key={product.productId}
                    product={product}
                    handleClickEdit={handleClickEditProduct}
                    handleClickDelete={(id) => deleteProduct(id)}
                  />
                ))
              : filteredProducts.map((product) => (
                  <Product
                    key={product.productId}
                    product={product}
                    handleClickEdit={handleClickEditProduct}
                    handleClickDelete={(id) => deleteProduct(id)}
                  />
                ))}
          </tbody>
        </table>
      </div>

      {/* SLIDING PANEL SECTION - ADD, EDIT PRODUCTS*/}
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
            <CloseIcon />
          </button>
        </div>

        {/* FORM - ADD, EDIT PRODUCTS*/}
        <form className="flex flex-col ">
          {/* ID field */}
          <div className="form-input">
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
          <div className="form-input">
            <div className="flex">
              <label>Product Name</label>
              <span className="text-red-500">*</span>
              {isSaveClicked && formData.productName.trim().length === 0 && (
                <ErrorMessage />
              )}
            </div>
            <input
              className={`border rounded h-[36px] ${
                isSaveClicked &&
                formData.productName.trim().length === 0 &&
                "border-red-500"
              }`}
              type="text"
              value={formData.productName}
              placeholder="Product Name"
              onChange={(e) =>
                setFormData({ ...formData, productName: e.target.value })
              }
            ></input>
          </div>

          {/* Product Owner drop-down list */}
          <div className="form-drop-down-list">
            <div className="flex">
              <label>Product Owner</label>
              <span className="text-red-500">*</span>
              {isSaveClicked && formData.productOwnerName.length === 0 && (
                <ErrorMessage />
              )}
            </div>
            <Select
              styles={
                isSaveClicked &&
                formData.productOwnerName.length === 0 &&
                dropDownValidationStyle
              }
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
          <div className="form-drop-down-list">
            <div className="flex">
              <label>Developers</label>
              <span className="text-red-500">*</span>
              {isSaveClicked && formData.developers.length === 0 && (
                <ErrorMessage />
              )}
            </div>
            <Select
              styles={
                isSaveClicked &&
                formData.developers.length === 0 &&
                dropDownValidationStyle
              }
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
          <div className="form-drop-down-list">
            <div className="flex">
              <label>Scrum Master</label>
              <span className="text-red-500">*</span>
              {isSaveClicked && formData.scrumMasterName.length === 0 && (
                <ErrorMessage />
              )}
            </div>
            <Select
              styles={
                isSaveClicked &&
                formData.scrumMasterName.length === 0 &&
                dropDownValidationStyle
              }
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
          <div className="form-drop-down-list">
            <div className="flex">
              <label>Start Date</label>
              <span className="text-red-500">*</span>
              {isSaveClicked && formData.startDate.length === 0 && (
                <ErrorMessage />
              )}
            </div>
            <DatePicker
              className={`border h-[36px] rounded w-full ${
                isSaveClicked &&
                formData.startDate.length === 0 &&
                "border-red-500"
              }`}
              selected={Date.parse(formData.startDate)}
              onChange={(date) => {
                handleChangeStartDate(date);
              }}
              dateFormat="yyyy/MM/dd"
              // minDate={new Date()}
              placeholderText={"Select..."}
              isClearable={isEditProduct ? false : true}
              showYearDropdown
              scrollableMonthYearDropdown
              disabled={isEditProduct ? true : false}
            />
          </div>

          {/* Methodology drop-down list */}
          <div className="form-drop-down-list">
            <div className="flex">
              <label>Methodology</label>
              <span className="text-red-500">*</span>
              {isSaveClicked && formData.methodology.length === 0 && (
                <ErrorMessage />
              )}
            </div>
            <Select
              styles={
                isSaveClicked &&
                formData.methodology.length === 0 &&
                dropDownValidationStyle
              }
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

      {/* <pre>{JSON.stringify(employees)}</pre> */}
      {/* <p>developers{JSON.stringify(employees[0])}</p> */}
    </>
  );
};

export default Products;
