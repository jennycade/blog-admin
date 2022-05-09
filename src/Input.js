import { useState } from 'react';

function Input({
  label,
  id,
  type,
  value,
  handleChange,
  options=[],
}) {

  return (
    <div className="form-field">
      <label
        htmlFor={id}
      >
        { label }
      </label>

      { type === 'textarea' && (
      
        <textarea
          id={id}
          onChange={handleChange}
        >
          {value}
        </textarea>
        )
      }
        
      { type === 'text' && (
        <input
          type={type}
          id={id}
          value={value}
          onChange={handleChange}
        />
      )}

      { type === 'select' && (
        <select
          id={id}
          value={value}
          onChange={handleChange}
        >
          { options.map(
            (option) => (
              <option
                key={option.value}
                value={option.value}
              >
                { option.displayName }
              </option>
            )
          )}
        </select>
      )}

    </div>
  );
};

export default Input;