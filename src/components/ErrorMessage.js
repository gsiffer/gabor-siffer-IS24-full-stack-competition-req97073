import React from "react";
import PropTypes from "prop-types";

const ErrorMessage = ({message}) => {
  return (
    <>
      <span className="text-red-500 flex-1 text-end px-2">
        {message}
      </span>
    </>
  );
};

ErrorMessage.defaultProps = {
  message: "Required field",
};

ErrorMessage.propTypes = {
  message: PropTypes.string,
};

export default ErrorMessage;
