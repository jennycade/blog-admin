import { useState } from 'react';

function Input(props) {
  // props
  const {
    label,
    id,
    type,
    value,
    handleChange,
  } = props;

  return (
    <>
      <label
        htmlFor={id}
        className="form-label"
      >
        { label }
      </label>

      <input
        type={type}
        id={id}
        value={value}
        onChange={handleChange}
        className="form-control"
      />
    </>
  );
};

export default Input;