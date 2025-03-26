import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

const FormField = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  component = 'input',
  required = false,
  tooltip = '',
  error = '',
  ...rest
}) => {
  const [focused, setFocused] = useState(false);
  
  return (
    <div className="form-group">
      <label htmlFor={name} className={required ? 'required-label' : ''}>
        {label}
        {required && <span className="required-indicator">*</span>}
        {tooltip && (
          <div className="tooltip">
            <FontAwesomeIcon icon={faInfoCircle} className="tooltip-icon" />
            <span className="tooltip-text">{tooltip}</span>
          </div>
        )}
      </label>
      
      <div className={`input-wrapper ${focused ? 'focused' : ''} ${error ? 'has-error' : ''}`}>
        {component === 'textarea' ? (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`form-control ${required ? 'required' : ''}`}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
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
            className={`form-control ${required ? 'required' : ''}`}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            {...rest}
          />
        )}
      </div>
      
      {error && (
        <div className="error-message">
          <FontAwesomeIcon icon={faExclamationCircle} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default FormField;