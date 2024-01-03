import React from "react";

const FormSelect = ({ label, name, defaultValue, size, options }) => {
  return (
    <div className="form-control">
      <label className="label" htmlFor={name}>
        <span className="label-text capitalize font-montserrat">{label}</span>
      </label>
      <select
        id={name}
        name={name}
        defaultValue={defaultValue}
        className={`select select-bordered ${size || "select-sm lg:select-md"}`}
      >
        {options.map((item, index) => {
          return (
            // 這邊記得也要加上 value，代表 option 的實際值
            <option key={index} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormSelect;
