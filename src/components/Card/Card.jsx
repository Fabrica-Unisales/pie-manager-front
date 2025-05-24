import React from 'react';
import styles from './Card.module.css';

const Card = ({ children, className = '' }) => (
  <div className={`${styles.card} ${className}`}>
    {children}
  </div>
);

export default Card; 