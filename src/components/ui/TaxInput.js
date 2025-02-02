import React from 'react';

import { Slider } from '@radix-ui/react-slider';

export const TaxInput = ({ income, setIncome, inputValue, setInputValue }) => {
  const handleInputChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setInputValue(value);
    if (value) {
      setIncome(Number(value));
    }
  };

  return (
    <div className="space-y-4">
      <label className="text-lg font-medium">Annual Income</label>
      <div className="flex gap-4 items-center">
        <TaxInput
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="text-lg font-semibold"
          placeholder="Enter annual income"
        />
        <Slider
          value={[income]}
          min={0}
          max={2000000}
          step={10000}
          onValueChange={(value) => setIncome(value[0])}
          className="w-full"
        />
      </div>
    </div>
  );
};