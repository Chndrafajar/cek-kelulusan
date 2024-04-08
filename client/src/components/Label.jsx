import React from 'react';

export default function Label({ forInput, value, className, children, style }) {
  return (
    <>
      <label htmlFor={forInput} className={`form-label ` + className} style={style}>
        {value ? value : children}
      </label>
    </>
  );
}
