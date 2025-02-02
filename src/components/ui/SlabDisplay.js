import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const SlabDisplay = ({ title, tax, slabs, formatCurrency, className }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className={`space-y-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg ${className}`}
  >
    <h3 className="font-semibold text-lg flex items-center gap-2">
      {title} <ArrowRight className="w-4 h-4" />
      <span className={title.includes('Old') ? 'text-red-500' : 'text-green-500'}>
        {formatCurrency(tax)}
      </span>
    </h3>
    {slabs.map((slab, index) => (
      <div
        key={index}
        className={`p-3 rounded-lg ${
          title.includes('Old')
            ? 'bg-blue-50 dark:bg-blue-900/20'
            : 'bg-green-50 dark:bg-green-900/20'
        }`}
      >
        <div className="flex justify-between text-sm">
          <span>
            {formatCurrency(slab.start)} - {formatCurrency(slab.end)}
          </span>
          <span className="font-semibold">{slab.rate}%</span>
        </div>
      </div>
    ))}
  </motion.div>
);
