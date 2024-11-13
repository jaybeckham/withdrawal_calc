import React, { useState } from 'react';
import { PlusCircle, Trash2, DollarSign } from 'lucide-react';
import { ExtraWithdrawalType } from '../types';
import { formatCurrency } from '../utils/formatting';
import Tooltip from './Tooltip';

interface Props {
  retirementAge: number;
  lifeExpectancy: number;
  extraWithdrawals: ExtraWithdrawalType[];
  onUpdate: (withdrawals: ExtraWithdrawalType[]) => void;
}

function ExtraWithdrawals({ retirementAge, lifeExpectancy, extraWithdrawals, onUpdate }: Props) {
  const [newWithdrawal, setNewWithdrawal] = useState<ExtraWithdrawalType>({
    age: retirementAge,
    amount: 0,
    description: ''
  });

  const handleAdd = () => {
    if (newWithdrawal.amount > 0 && newWithdrawal.description) {
      onUpdate([...extraWithdrawals, newWithdrawal]);
      setNewWithdrawal({
        age: retirementAge,
        amount: 0,
        description: ''
      });
    }
  };

  const handleRemove = (index: number) => {
    const updated = extraWithdrawals.filter((_, i) => i !== index);
    onUpdate(updated);
  };

  return (
    <div className="card">
      <div className="flex items-center space-x-1">
        <h2 className="section-title mb-0">Extra Withdrawals</h2>
        <Tooltip content="Plan for large one-time expenses during retirement, such as buying a new car, home renovations, or special vacations." />
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Plan for large one-time expenses during retirement (e.g., new car, home renovation, travel)
      </p>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="flex items-center space-x-1">
              <label className="text-sm font-medium text-gray-700">Age</label>
              <Tooltip content="The age at which you plan to make this withdrawal." />
            </div>
            <input
              type="number"
              min={retirementAge}
              max={lifeExpectancy}
              value={newWithdrawal.age}
              onChange={(e) => setNewWithdrawal({
                ...newWithdrawal,
                age: parseInt(e.target.value)
              })}
              className="input-field mt-2"
            />
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <label className="text-sm font-medium text-gray-700">Amount</label>
              <Tooltip content="How much money you'll need for this expense." />
            </div>
            <div className="relative mt-2">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                min="0"
                value={newWithdrawal.amount}
                onChange={(e) => setNewWithdrawal({
                  ...newWithdrawal,
                  amount: parseFloat(e.target.value)
                })}
                className="input-field pl-10"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <label className="text-sm font-medium text-gray-700">Description</label>
              <Tooltip content="A brief note about what this withdrawal is for." />
            </div>
            <div className="flex space-x-2 mt-2">
              <input
                type="text"
                value={newWithdrawal.description}
                onChange={(e) => setNewWithdrawal({
                  ...newWithdrawal,
                  description: e.target.value
                })}
                placeholder="e.g., New Car"
                className="input-field"
              />
              <button
                onClick={handleAdd}
                disabled={!newWithdrawal.amount || !newWithdrawal.description}
                className="btn-primary"
              >
                <PlusCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {extraWithdrawals.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Planned Withdrawals</h3>
            <div className="space-y-2">
              {extraWithdrawals
                .sort((a, b) => a.age - b.age)
                .map((withdrawal, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center">
                        <span className="text-indigo-600 font-semibold">
                          Age {withdrawal.age}:
                        </span>
                        <span className="ml-2 font-medium">
                          {formatCurrency(withdrawal.amount)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{withdrawal.description}</p>
                    </div>
                    <button
                      onClick={() => handleRemove(index)}
                      className="text-red-600 hover:text-red-700 p-1"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExtraWithdrawals;