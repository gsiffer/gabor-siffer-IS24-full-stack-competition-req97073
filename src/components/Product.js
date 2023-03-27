import React from "react";
import PencilSquare from "@/components/icons/PencilSquare";
import Trash from "@/components/icons/Trash";

const Product = ({ product, handleClickEdit, handleClickDelete }) => {
  return (
    <>
      <tr className="h-10 border-b border-gray-200">
        <td className="text-center">{product.productId}</td>
        <td>{product.productName}</td>
        <td>{product.productOwnerName}</td>
        <td>
          <ul>
            {product.developers.map((developer, index) => (
              <li key={index}>{developer}</li>
            ))}
          </ul>
        </td>
        <td>{product.scrumMasterName}</td>
        <td className="text-center">{product.startDate}</td>
        <td className="text-center">{product.methodology}</td>
        <td className="text-center">
          <button onClick={() => handleClickEdit(product.productId)}>
            <PencilSquare title="Edit product" />
          </button>
        </td>
        <td className="text-center">
          <button onClick={() => handleClickDelete(product.productId)}>
            <Trash title="Delete product" />
          </button>
        </td>
      </tr>
    </>
  );
};

export default Product;
