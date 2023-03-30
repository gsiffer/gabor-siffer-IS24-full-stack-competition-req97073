import React from "react";
import PropTypes from "prop-types";
/* BasicButton component 
props:
  - name: changes the button text
  - style: adds more styles to the button
*/
const Button = ({ name, handleClick, style }) => {
  return (
    <>
      <button
        type="button"
        className={`bg-blue-500 text-white rounded-md px-4 py-2 ${style}`}
        onClick={handleClick}
      >
        {name}
      </button>
    </>
  );
};
// Default text of the button
Button.defaultProps = {
  name: "SUBMIT",
};

Button.propTypes = {
  name: PropTypes.string,
};

export default Button;
