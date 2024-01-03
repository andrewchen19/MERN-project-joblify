import React from "react";

const FormInput = ({ label, type, name, defaultValue, size }) => {
  return (
    <div className="form-control">
      <label className="label" htmlFor={name}>
        <span className="label-text capitalize font-montserrat">{label}</span>
      </label>
      <input
        type={type}
        id={name}
        name={name}
        defaultValue={defaultValue}
        className={`input input-bordered ${size || "input-sm lg:input-md"}`}
      />
    </div>
  );
};

export default FormInput;
