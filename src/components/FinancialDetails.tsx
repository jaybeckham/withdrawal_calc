import React from 'react';
import { FinancialDetailsType } from '../types';
import { formatCurrency } from '../utils/formatting';
import Tooltip from './Tooltip';

interface Props {
  value: FinancialDetailsType;
  onChange: (value: FinancialDetailsType) => void;
}

function FinancialDetails({ value, onChange }: Props) {
  return (
    <div className="card">
      <h2 className="section-title">Financial Details</h2>
      <div className="space-y-4">
        <div>
          <div className="flex items-center space-x-1">
            <label className="text-sm font-medium text-gray-700">
              Current Savings
            </label>
            <Tooltip content="The total amount you've already saved for retirement, including 401(k)s, IRAs, and other investments." />
          </div>
          <input
            type="number"
            value={value.currentSavings}
            onChange={(e) =>
              onChange({ ...value, currentSavings: parseFloat(e.target.value) })
            }
            className="input-field mt-2"
          />
          <div className="mt-1 text-sm text-gray-600">
            {formatCurrency(value.currentSavings)}
          </div>
        </div>

        <div>
          <div className="flex items-center space-x-1">
            <label className="text-sm font-medium text-gray-700">
              Monthly Expenses
            </label>
            <Tooltip content="How much you expect to spend each month in retirement, including regular bills, healthcare, and leisure activities." />
          </div>
          <input
            type="number"
            value={value.monthlyExpenses}
            onChange={(e) =>
              onChange({ ...value, monthlyExpenses: parseFloat(e.target.value) })
            }
            className="input-field mt-2"
          />
          <div className="mt-1 text-sm text-gray-600">
            {formatCurrency(value.monthlyExpenses)}
          </div>
        </div>

        <div>
          <div className="flex items-center space-x-1">
            <label className="text-sm font-medium text-gray-700">
              Expected Return (%)
            </label>
            <Tooltip content="The average annual return you expect from your investments. A conservative estimate is usually between 5-7%." />
          </div>
          <input
            type="range"
            min="0"
            max="15"
            step="0.5"
            value={value.expectedReturn}
            onChange={(e) =>
              onChange({ ...value, expectedReturn: parseFloat(e.target.value) })
            }
            className="slider mt-2"
          />
          <div className="mt-1 text-sm text-gray-600">{value.expectedReturn}%</div>
        </div>

        <div>
          <div className="flex items-center space-x-1">
            <label className="text-sm font-medium text-gray-700">
              Inflation Rate (%)
            </label>
            <Tooltip content="The expected rate of price increases over time. The historical average is around 2-3% per year." />
          </div>
          <input
            type="range"
            min="0"
            max="10"
            step="0.5"
            value={value.inflationRate}
            onChange={(e) =>
              onChange({ ...value, inflationRate: parseFloat(e.target.value) })
            }
            className="slider mt-2"
          />
          <div className="mt-1 text-sm text-gray-600">{value.inflationRate}%</div>
        </div>
      </div>
    </div>
  );
}

export default FinancialDetails;