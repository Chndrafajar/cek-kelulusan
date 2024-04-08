import React from 'react';

export default function ValidationError({ errors }) {
  return (
    Object.keys(errors).length > 0 && (
      <div className="valid-error mb-3 mt-3">
        <div className="error-title">Whooops! Something Went Wrong</div>
        <ul className="error-items">
          {Object.keys(errors).map(function (key, index) {
            return <li key={index}>{errors[key]}</li>;
          })}
        </ul>
      </div>
    )
  );
}
