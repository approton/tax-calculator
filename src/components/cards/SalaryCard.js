import React from 'react';
import { motion } from 'framer-motion';

export const SalaryCard = ({ title, amount, icon: Icon, className }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`p-6 rounded-xl shadow-lg ${className}`}
  >
    <div className="flex items-center gap-3 mb-2">
      <Icon className="w-5 h-5" />
      <h3 className="font-medium text-sm">{title}</h3>
    </div>
    <p className="text-2xl font-bold">{amount}</p>
  </motion.div>
);