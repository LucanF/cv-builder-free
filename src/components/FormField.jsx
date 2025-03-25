
import React from 'react';

const FormField = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  component = 'input',
  ...rest
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      {component === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="form-control"
          {...rest}
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="form-control"
          {...rest}
        />
      )}
    </div>
  );
};

export default FormField;