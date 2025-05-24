import React from 'react';
import styles from './Button.module.css';

const Button = ({ children, onClick, type = 'button', className = '' }) => (
  <button type={type} onClick={onClick} className={`${styles.button} ${className}`}>
    {children}
  </button>
);

export default Button; 