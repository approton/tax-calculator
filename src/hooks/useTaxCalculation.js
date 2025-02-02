import { useState, useEffect } from 'react';
import { TAX_SLABS } from '../utils/constants';

export const useTaxCalculation = (income) => {
  const [oldTax, setOldTax] = useState(0);
  const [newTax, setNewTax] = useState(0);

  const calculateTax = (amount, slabs) => {
    let remainingAmount = amount;
    let totalTax = 0;

    for (const slab of slabs) {
      const slabAmount = Math.min(
        Math.max(0, remainingAmount),
        slab.end - slab.start
      );
      totalTax += (slabAmount * slab.rate) / 100;
      remainingAmount -= slabAmount;
      if (remainingAmount <= 0) break;
    }

    return totalTax;
  };

  useEffect(() => {
    setOldTax(calculateTax(income, TAX_SLABS.OLD));
    setNewTax(calculateTax(income, TAX_SLABS.NEW));
  }, [income]);

  return { oldTax, newTax };
};