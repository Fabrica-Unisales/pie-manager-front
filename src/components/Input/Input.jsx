import React from 'react';
import styles from './Input.module.css';

const Input = ({ label, type = 'text', value, onChange, placeholder, name, className = '' }) => (
  <div className={styles.inputGroup}>
    {label && <label className={styles.label}>{label}</label>}
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      name={name}
      className={`${styles.input} ${className}`}
    />
  </div>
);

export default Input; 