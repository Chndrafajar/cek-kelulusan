import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

Input.propTypes = {
  type: PropTypes.oneOf(['text', 'email', 'date', 'password', 'number', 'file']),
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  autoComplete: PropTypes.string,
  required: PropTypes.bool,
  isFocused: PropTypes.bool,
  handleChange: PropTypes.func,
  placeholder: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'black', 'danger', 'light-outline', 'white-outline']),
  isError: PropTypes.bool,
};

export default function Input({ type = 'text', name, value, defaultValue, className, autoComplete, required, isFocused, handleChange, placeholder, isError, style, min, max, variant = 'primary' }) {
  const input = useRef();

  useEffect(() => {
    if (isFocused) {
      input.current.focus();
    }
  }, []);

  return (
    <>
      <input
        type={type}
        name={name}
        value={value}
        defaultValue={defaultValue}
        className={`form-input input-${variant} ${isError && 'input-error'} ${className}`}
        ref={input}
        autoComplete={autoComplete}
        required={required}
        onChange={(e) => handleChange(e)}
        placeholder={placeholder}
        style={style}
        min={min}
        max={max}
      />
    </>
  );
}
