export const TAX_SLABS = {
    OLD: [
      { start: 0, end: 300000, rate: 0 },
      { start: 300000, end: 400000, rate: 5 },
      { start: 400000, end: 1000000, rate: 10 },
      { start: 1000000, end: 1200000, rate: 15 },
      { start: 1200000, end: 1500000, rate: 20 }
    ],
    NEW: [
      { start: 0, end: 400000, rate: 0 },
      { start: 400000, end: 800000, rate: 5 },
      { start: 800000, end: 1200000, rate: 10 },
      { start: 1200000, end: 1600000, rate: 15 }
    ]
  };