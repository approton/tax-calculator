import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const ComparisonChart = ({ data, formatCurrency }) => (
  <div className="h-80 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip
          formatter={(value) => formatCurrency(value)}
          contentStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: 'none',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        />
        <Legend />
        <Bar dataKey="Old Regime" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        <Bar dataKey="New Regime" fill="#22c55e" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);