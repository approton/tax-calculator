import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/globals.css';
import TaxCalculator from './components/TaxCalculator';

const root = createRoot(document.getElementById('root'));
root.render(
    <TaxCalculator />
);