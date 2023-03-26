import React from "react";
import { useState } from "react";
import BasicButton from "@/components/BasicButton";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Products = () => {
  const [selectedDevelopers, setSelectedDevelopers] = useState([]);
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
  const handleChangeDevelopers = (e) => {
    setSelectedDevelopers(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  const scrumMasters = [
    { value: "Steve Master", label: "Steve Master" },
    { value: "Bob Master", label: "Bob Master" },
    { value: "Gabor Master", label: "Gabor Master" },
  ];

  const [selectedScrumMaster, setSelectedScrumMaster] = useState("");

  const handleChangeScrumMasters = (e) => {
    setSelectedScrumMaster(e.value);
    // console.log(e);
  };

  const productOwners = [
    { value: "Steve Owners", label: "Steve Owners" },
    { value: "Bob Owners", label: "Bob Owners" },
    { value: "Gabor Owners", label: "Gabor Owners" },
  ];

  const [selectedProductOwner, setSelectedProductOwner] = useState("");

  const handleChangeProductOwners = (e) => {
    setSelectedProductOwner(e.value);
  };

  const [selectedDate, setSelectedDate] = useState(null);

  const methodologies = [
    { value: "Agile", label: "Agile" },
    { value: "Waterfall", label: "Waterfall" },
  ];

  const [selectedMethodology, setSelectedMethodology] = useState("");

  const handleChangeMethodologies = (e) => {
    setSelectedMethodology(e.value);
  };

  const [products, setProducts] = useState([]);
  const [isPanelSlide, setIsPanelSlide] = useState(false);
  const [isNewProduct, setIsNewProduct] = useState(false);
  const [isEditProduct, setIsEditProduct] = useState(false);

  const handleClickCancel = (e) => {
    e.preventDefault();
    setSelectedDevelopers([]);
    setSelectedScrumMaster("");
    setSelectedProductOwner("");
    setSelectedDate(null);
    setSelectedMethodology("");
    setIsPanelSlide(false);
    setIsNewProduct(false);
    setIsEditProduct(false);
  };

  const handleClickNewProduct = () => {
    setIsPanelSlide(true);
    setIsNewProduct(true);
  };

  const handleClickEditProduct = () => {
    setIsPanelSlide(true);
    setIsEditProduct(true);
  };

  const handleClickSave = () => {
    setIsPanelSlide(false);
    setIsNewProduct(false);
    setIsEditProduct(false);
  };

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
    console.log(products);
  };

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
            <th className="w-[5%] text-center">#</th>
            <th className="w-[5%] text-center">#</th>
          </tr>
        </thead>
        <tbody>
          <tr className="h-10 border-b border-gray-200">
            <td className="text-center">126</td>

            <td className="">Product Name</td>

            <td className="">Product Owner</td>

            <td className="">
              <ul>
                <li>Developer One</li>
              </ul>
            </td>

            <td className="">Scrum Master</td>

            <td className="text-center">2023-05-26</td>

            <td className="text-center">Methodology</td>

            <td className="text-center">
              <button onClick={handleClickEditProduct}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-7 h-7 mx-auto text-green-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </button>
            </td>

            <td className="text-center">
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-7 h-7 mx-auto text-red-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </td>
          </tr>

          <tr className="h-10 border-b border-gray-200">
            <td className="text-center">126</td>

            <td className="">Product Name</td>

            <td className="">Product Owner</td>

            <td className="">
              <ul>
                <li>Developer One</li>
                <li>Developer Two</li>
                <li>Developer Three</li>
                <li>Developer Four</li>
                <li>Developer FIve</li>
              </ul>
            </td>

            <td className="">Scrum Master</td>

            <td className="text-center">2023-05-26</td>

            <td className="text-center">Methodology</td>

            <td className="text-center">
              <button onClick={handleClickEditProduct}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-7 h-7 mx-auto text-green-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </button>
            </td>

            <td className="text-center">
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-7 h-7 mx-auto text-red-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </td>
          </tr>

          <tr className="h-10 border-b border-gray-200">
            <td className="text-center">126</td>

            <td className="">Product Name</td>

            <td className="">Product Owner</td>

            <td className="">
              <ul>
                <li>Developer One</li>
                <li>Developer Two</li>
                <li>Developer Three</li>
                <li>Developer Four</li>
                <li>Developer FIve</li>
              </ul>
            </td>

            <td className="">Scrum Master</td>

            <td className="text-center">2023-05-26</td>

            <td className="text-center">Methodology</td>

            <td className="text-center">
              <button onClick={handleClickEditProduct}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-7 h-7 mx-auto text-green-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </button>
            </td>

            <td className="text-center">
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-7 h-7 mx-auto text-red-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </td>
          </tr>

          <tr className="h-10 border-b border-gray-200">
            <td className="text-center">126</td>

            <td className="">Product Name</td>

            <td className="">Product Owner</td>

            <td className="">
              <ul>
                <li>Developer One</li>
                <li>Developer Two</li>
                <li>Developer Three</li>
                <li>Developer Four</li>
                <li>Developer FIve</li>
              </ul>
            </td>

            <td className="">Scrum Master</td>

            <td className="text-center">2023-05-26</td>

            <td className="text-center">Methodology</td>

            <td className="text-center">
              <button onClick={handleClickEditProduct}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-7 h-7 mx-auto text-green-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </button>
            </td>

            <td className="text-center">
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-7 h-7 mx-auto text-red-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </td>
          </tr>

          <tr className="h-10 border-b border-gray-200">
            <td className="text-center">126</td>

            <td className="">Product Name</td>

            <td className="">Product Owner</td>

            <td className="">
              <ul>
                <li>Developer One</li>
                <li>Developer Two</li>
                <li>Developer Three</li>
                <li>Developer Four</li>
                <li>Developer FIve</li>
              </ul>
            </td>

            <td className="">Scrum Master</td>

            <td className="text-center">2023-05-26</td>

            <td className="text-center">Methodology</td>

            <td className="text-center">
              <button onClick={handleClickEditProduct}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-7 h-7 mx-auto text-green-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </button>
            </td>

            <td className="text-center">
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-7 h-7 mx-auto text-red-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div className={`cover-box ${isPanelSlide && "cover-over"}`}></div>

      <div className={`panel-wrap ${isPanelSlide && "slide-in"}`}>
        <div className="panel">
          <div className="flex justify-between">
            <h2 className="text-lg font-medium text-gray-900 mb-10 mt-2">
              {isNewProduct ? "Add New Product" : "Edit Product"}
            </h2>
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
              <span className="sr-only">Close menu</span>

              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <form className="flex flex-col justify-between h-[550px]">
            <div className="flex flex-col">
              <label>ID</label>
              <input className="border rounded h-[36px]" type="text"></input>
            </div>

            <div className="flex flex-col">
              <label>Product Name</label>
              <input className="border rounded h-[36px]" type="text"></input>
            </div>

            <div>
              <label>Product Owner</label>
              <Select
                id="long-value-select"
                instanceId="long-value-select"
                options={productOwners}
                value={productOwners.filter((obj) =>
                  selectedProductOwner.includes(obj.value)
                )} // set selected values
                onChange={handleChangeProductOwners}
              />
            </div>

            <div>
              <label>Developers</label>
              <Select
                id="long-value-select"
                instanceId="long-value-select"
                className="dropdown"
                placeholder="Select Option"
                value={developers.filter((obj) =>
                  selectedDevelopers.includes(obj.value)
                )} // set selected values
                options={developers} // set list of the data
                onChange={handleChangeDevelopers} // assign onChange function
                isOptionDisabled={() => selectedDevelopers.length >= 5} // only allow user to choose up to 5 options
                isMulti
                isClearable
              />
            </div>

            <div>
              <label>Scrum Master</label>
              <Select
                id="long-value-select"
                instanceId="long-value-select"
                options={scrumMasters}
                value={scrumMasters.filter((obj) =>
                  selectedScrumMaster.includes(obj.value)
                )} // set selected values
                onChange={handleChangeScrumMasters}
              />
            </div>

            <div>
              <label>Start Date</label>
              <DatePicker
                className="border h-[36px] rounded w-full"
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd-MM-yyyy"
                // minDate={new Date()}
                isClearable
                showYearDropdown
                scrollableMonthYearDropdown
              />
            </div>

            <div>
              <label>Methodology</label>
              <Select
                id="long-value-select"
                instanceId="long-value-select"
                options={methodologies}
                value={methodologies.filter((obj) =>
                  selectedMethodology.includes(obj.value)
                )} // set selected values
                onChange={handleChangeMethodologies}
              />
            </div>

            <div className="flex justify-end mt-2">
              <BasicButton name="SAVE" style="mr-2" />
              <BasicButton name="CANCEL" handleClick={handleClickCancel} />
            </div>
          </form>
        </div>
      </div>
      <pre>{JSON.stringify(selectedDevelopers)}</pre>
      <p>{selectedScrumMaster}</p>
    </>

    // <div>
    //   <button onClick={fetchProducts}>Load Data</button>
    //   <p className="text-3xl font-bold underline">Test</p>
    //   <pre>{JSON.stringify(products)}</pre>
    // </div>
  );
};

export default Products;
