function Input({
  label,
  id,
  type,
  value,
  handleChange,
  options=[],
}) {

  const handleCheckBoxClick = (e) => {
    const clickedOption = e.target.value;

    // toggle
    const newValue = [...value];
    const index = newValue.findIndex(x => x === clickedOption);
    if (index === -1) {
      // add
      newValue.push(clickedOption);
    } else {
      // remove
      newValue.splice(index, 1);
    }
    // callback
    handleChange(newValue);
  }

  return (
    <div className="form-field">
      { type === 'checkboxGroup' &&
        <fieldset>
          <legend>{ label }</legend>
          {
            options.map((option) => (
              <div className="checkboxOption" key={option.value}>
                <input
                  key={option.value}
                  id={option.value}
                  type="checkbox"
                  value={option.value}
                  checked={value.includes(option.value)}
                  onChange={handleCheckBoxClick}
                />
                <label htmlFor={option.value}>
                  { option.displayName }
                </label>
              </div>
            ))
          }
        </fieldset>
      }
 
      { type !== 'checkboxGroup' && (
        <label
          htmlFor={id}
        >
          { label }
        </label>
      )}

      { type === 'textarea' && (
      
        <textarea
          id={id}
          onChange={handleChange}
          value={value}
        />
        )
      }
        
      { (type === 'text' || type === 'password') && (
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