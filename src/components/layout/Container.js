import React from 'react';

export const Container = ({ children, className = '' }) => (
  <div className={`w-full max-w-6xl mx-auto p-6 ${className}`}>
    {children}
  </div>
);