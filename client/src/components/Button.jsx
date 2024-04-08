import React from 'react';
import PropTypes from 'prop-types';

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'black', 'danger', 'light-outline', 'white-outline']),
  processing: PropTypes.bool,
  children: PropTypes.node,
};

export default function Button({ type = 'submit', className = '', variant = 'primary', processing, children, style, handleClick }) {
  return (
    <button type={type} className={`button button-${variant} rounded-2xl py-[13px] w-full ${processing && 'opacity-30'} ${className}`} disabled={processing} style={style} onClick={handleClick}>
      {children}
    </button>
  );
}
