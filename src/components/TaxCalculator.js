import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { Slider } from './ui/slider';
import { Input } from './ui/input';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowRight, TrendingUp, Wallet } from 'lucide-react';

const TaxCalculator = () => {
  const [income, setIncome] = useState(1500000);
  const [inputValue, setInputValue] = useState('1500000');
  const [oldTax, setOldTax] = useState(0);
  const [newTax, setNewTax] = useState(0);

  const oldSlabs = [
    { start: 0, end: 300000, rate: 0 },
    { start: 300000, end: 400000, rate: 5 },
    { start: 400000, end: 1000000, rate: 10 },
    { start: 1000000, end: 1200000, rate: 15 },
    { start: 1200000, end: 1500000, rate: 20 },
    { start: 1500000, end: 2000000, rate: 25 },
    { start: 2000000, end: 3000000, rate: 30 },
    { start: 3000000, end: Infinity, rate: 35 },
  ];

  const newSlabs = [
    { start: 0, end: 400000, rate: 0 },
    { start: 400000, end: 800000, rate: 5 },
    { start: 800000, end: 1200000, rate: 10 },
    { start: 1200000, end: 1600000, rate: 15 },
    { start: 1600000, end: 2000000, rate: 20 },
    { start: 2000000, end: 3000000, rate: 25 },
    { start: 3000000, end: Infinity, rate: 30 },
  ];

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
    setOldTax(calculateTax(income, oldSlabs));
    setNewTax(calculateTax(income, newSlabs));
    setInputValue(income.toString());
  }, [income]);

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setInputValue(value);
    if (value) {
      setIncome(Number(value));
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const SalaryCard = ({ title, amount, icon: Icon, className }) => (
    <div className={`p-6 rounded-xl ${className}`}>
      <div className="flex items-center gap-3 mb-2">
        <Icon className="w-5 h-5" />
        <h3 className="font-medium text-sm">{title}</h3>
      </div>
      <p className="text-2xl font-bold">{formatCurrency(amount)}</p>
    </div>
  );

  const compareData = [
    {
      category: 'Take Home',
      'Old Regime': income - oldTax,
      'New Regime': income - newTax,
    },
    {
      category: 'Tax Payable',
      'Old Regime': oldTax,
      'New Regime': newTax,
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader className="bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardTitle className="text-3xl font-bold text-center text-blue-600">
            Income Tax Calculator 2024
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-4">
            <label className="text-lg font-medium">Annual Income</label>
            <div className="flex gap-4 items-center">
              <Input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                className="text-lg font-semibold"
                placeholder="Enter annual income"
              />
              <Slider
                value={[income]}
                min={0}
                max={3000000}
                step={10000}
                onValueChange={(value) => setIncome(value[0])}
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SalaryCard
              title="Annual Income"
              amount={income}
              icon={Wallet}
              className="bg-white shadow-lg"
            />
            <SalaryCard
              title="Old Regime Take Home"
              amount={income - oldTax}
              icon={TrendingUp}
              className="bg-blue-100"
            />
            <SalaryCard
              title="New Regime Take Home"
              amount={income - newTax}
              icon={TrendingUp}
              className="bg-green-100"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4 bg-white p-6 rounded-xl shadow-lg">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                Old Tax Regime <ArrowRight className="w-4 h-4" />
                <span className="text-red-500">{formatCurrency(oldTax)}</span>
              </h3>
              {oldSlabs.map((slab, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg bg-blue-50"
                >
                  <div className="flex justify-between text-sm">
                    <span>
                      {formatCurrency(slab.start)} - {slab.end === Infinity ? 'Above' : formatCurrency(slab.end)}
                    </span>
                    <span className="font-semibold">{slab.rate}%</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 bg-white p-6 rounded-xl shadow-lg">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                New Tax Regime <ArrowRight className="w-4 h-4" />
                <span className="text-green-500">{formatCurrency(newTax)}</span>
              </h3>
              {newSlabs.map((slab, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg bg-green-50"
                >
                  <div className="flex justify-between text-sm">
                    <span>
                      {formatCurrency(slab.start)} - {slab.end === Infinity ? 'Above' : formatCurrency(slab.end)}
                    </span>
                    <span className="font-semibold">{slab.rate}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="h-80 bg-white p-6 rounded-xl shadow-lg">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={compareData}>
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
                <Bar
                  dataKey="Old Regime"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="New Regime"
                  fill="#22c55e"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxCalculator;