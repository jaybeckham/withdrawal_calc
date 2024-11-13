import React from 'react';
import { DollarSign } from 'lucide-react';
import Tooltip from './Tooltip';

interface RetirementIncomeProps {
  socialSecurity: number;
  pension: number;
  otherIncome: number;
  onUpdate: (field: string, value: number) => void;
}

function RetirementIncome({ socialSecurity, pension, otherIncome, onUpdate }: RetirementIncomeProps) {
  const handleInputChange = (field: string, value: string) => {
    // Convert empty string to 0, otherwise parse the number
    const numericValue = value === '' ? 0 : parseFloat(value);
    // Only update if it's a valid number
    if (!isNaN(numericValue)) {
      onUpdate(field, numericValue);
    }
  };

  return (
    <div className="card">
      <h2 className="section-title">Retirement Income Sources</h2>
      
      <div className="space-y-4">
        <div>
          <div className="flex items-center space-x-1">
            <label htmlFor="socialSecurity" className="text-sm font-medium text-gray-700">
              Monthly Social Security Benefits
            </label>
            <Tooltip content="Your expected monthly Social Security payment. You can get an estimate from the Social Security Administration website." />
          </div>
          <div className="mt-2 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              id="socialSecurity"
              className="input-field pl-10"
              value={socialSecurity || ''}
              onChange={(e) => handleInputChange('socialSecurity', e.target.value)}
              min="0"
              step="100"
              placeholder="0"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center space-x-1">
            <label htmlFor="pension" className="text-sm font-medium text-gray-700">
              Monthly Pension Income
            </label>
            <Tooltip content="Monthly payments from any pension plans you'll receive in retirement." />
          </div>
          <div className="mt-2 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              id="pension"
              className="input-field pl-10"
              value={pension || ''}
              onChange={(e) => handleInputChange('pension', e.target.value)}
              min="0"
              step="100"
              placeholder="0"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center space-x-1">
            <label htmlFor="otherIncome" className="text-sm font-medium text-gray-700">
              Other Monthly Income
            </label>
            <Tooltip content="Any other regular monthly income you expect in retirement, such as rental income or part-time work." />
          </div>
          <div className="mt-2 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              id="otherIncome"
              className="input-field pl-10"
              value={otherIncome || ''}
              onChange={(e) => handleInputChange('otherIncome', e.target.value)}
              min="0"
              step="100"
              placeholder="0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RetirementIncome;