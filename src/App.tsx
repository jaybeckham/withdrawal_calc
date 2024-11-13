import React, { useState, useEffect } from 'react';
import PersonalInfo from './components/PersonalInfo';
import FinancialDetails from './components/FinancialDetails';
import RetirementIncome from './components/RetirementIncome';
import ExtraWithdrawals from './components/ExtraWithdrawals';
import ResultsSection from './components/ResultsSection';
import ChartSection from './components/ChartSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import { calculateRetirementProjections } from './utils/calculations';
import { PersonalInfoType, FinancialDetailsType, RetirementIncomeType, ProjectionsType, ExtraWithdrawalType } from './types';
import { exportToPDF, exportToExcel } from './utils/export';
import { Download, Calculator } from 'lucide-react';

function App() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfoType>({
    currentAge: 30,
    retirementAge: 65,
    lifeExpectancy: 90
  });

  const [financialDetails, setFinancialDetails] = useState<FinancialDetailsType>({
    currentSavings: 100000,
    monthlyExpenses: 5000,
    expectedReturn: 7,
    inflationRate: 2.5
  });

  const [retirementIncome, setRetirementIncome] = useState<RetirementIncomeType>({
    socialSecurity: 2000,
    pension: 1000,
    otherIncome: 500
  });

  const [extraWithdrawals, setExtraWithdrawals] = useState<ExtraWithdrawalType[]>([]);
  const [projections, setProjections] = useState<ProjectionsType | null>(null);

  useEffect(() => {
    const newProjections = calculateRetirementProjections(
      personalInfo,
      financialDetails,
      retirementIncome,
      extraWithdrawals
    );
    setProjections(newProjections);
  }, [personalInfo, financialDetails, retirementIncome, extraWithdrawals]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Calculator className="h-8 w-8 text-indigo-600" />
              <h1 className="ml-3 text-xl font-semibold text-gray-900">
                Retirement Withdrawal Calculator
              </h1>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">
                Retirement Withdrawal Calculator
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Optimize your retirement strategy with data-driven insights
            </p>
          </div>
          
          <main className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <PersonalInfo
                value={personalInfo}
                onChange={setPersonalInfo}
              />
              <FinancialDetails
                value={financialDetails}
                onChange={setFinancialDetails}
              />
              <RetirementIncome
                socialSecurity={retirementIncome.socialSecurity}
                pension={retirementIncome.pension}
                otherIncome={retirementIncome.otherIncome}
                onUpdate={(field, value) =>
                  setRetirementIncome(prev => ({ ...prev, [field]: value }))
                }
              />
            </div>

            <ExtraWithdrawals
              retirementAge={personalInfo.retirementAge}
              lifeExpectancy={personalInfo.lifeExpectancy}
              extraWithdrawals={extraWithdrawals}
              onUpdate={setExtraWithdrawals}
            />

            {projections && (
              <>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => exportToPDF(projections)}
                    className="btn-secondary"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export PDF
                  </button>
                  <button
                    onClick={() => exportToExcel(projections)}
                    className="btn-secondary"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Excel
                  </button>
                </div>

                <ResultsSection projections={projections} />
                <ChartSection projections={projections} />
              </>
            )}

            <FAQSection />
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;