import React from "react";
import PropTypes from "prop-types";

const Button = ({ name, handleClick, style }) => {
  return (
    <>
      <button
        className={`bg-blue-500 text-white rounded-md p-2 ${style}`}
        onClick={handleClick}
      >
        {name}
      </button>
    </>
  );
};

Button.defaultProps = {
  name: "SUBMIT",
};

Button.propTypes = {
  name: PropTypes.string,
};

export default Button;
