import React from "react";

const FormTitle = ({ text }) => {
  return (
    <h2 className="mb-8 capitalize font-palanquin font-semibold text-secondary text-2xl lg:text-3xl tracking-wide">
      {text}
    </h2>
  );
};

export default FormTitle;
