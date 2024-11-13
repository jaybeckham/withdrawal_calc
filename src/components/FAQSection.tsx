import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Why does the withdrawal amount increase every year?",
      answer: "The withdrawal amount typically increases annually to account for inflation, ensuring your purchasing power remains consistent throughout retirement."
    },
    {
      question: "Why do I have to include taxes in the amount needed to live?",
      answer: "You should include taxes in your living expenses because they're a real cost you'll face in retirement. Most calculators don't automatically include taxes because tax situations vary widely among individuals."
    },
    {
      question: "What if I want the earnings to include taxes?",
      answer: "If you want earnings to include taxes, you should input your expected after-tax rate of return. This will give you a more conservative estimate of your investment growth."
    },
    {
      question: "How much do I need to live on?",
      answer: "This varies greatly depending on your lifestyle and location. A common rule of thumb is to plan for 70-80% of your pre-retirement income, but it's best to create a detailed retirement budget."
    },
    {
      question: "I don't understand compounding. Does it really make a difference?",
      answer: "Compounding is when you earn returns on your initial investment plus previous returns. It can make a significant difference over time, especially for long-term investments like retirement savings."
    },
    {
      question: "What can I expect the inflation rate to be?",
      answer: "Historically, inflation in the U.S. has averaged around 3% annually. However, it can vary. Many retirement calculators use a default of 2-3%, but allow you to adjust this assumption."
    },
    {
      question: "What can I expect to get from Social Security?",
      answer: "Your Social Security benefit depends on your earnings history and the age you start claiming benefits. You can get an estimate from the Social Security Administration's website."
    },
    {
      question: "How long will my assets last given a fixed interest rate?",
      answer: "This depends on your initial balance, withdrawal rate, and the interest rate. Most calculators can provide this estimate based on your inputs."
    },
    {
      question: "How much can I withdraw from my savings without running out of money?",
      answer: "The traditional \"4% rule\" suggests withdrawing 4% of your initial balance annually, adjusted for inflation. However, this is a guideline and may not suit everyone's situation."
    },
    {
      question: "What is a conservative withdrawal rate?",
      answer: "A conservative withdrawal rate is typically considered to be 3-3.5% of your initial balance, adjusted annually for inflation."
    },
    {
      question: "How does the calculator account for inflation?",
      answer: "Most calculators increase your annual withdrawals by the assumed inflation rate to maintain purchasing power over time."
    },
    {
      question: "What age should I input for retirement?",
      answer: "Input the age at which you plan to stop working full-time and start relying on your retirement savings."
    },
    {
      question: "What should I include in my current annual household income?",
      answer: "Include all sources of income: salaries, bonuses, rental income, etc. This helps in estimating your retirement needs."
    },
    {
      question: "What should I include in my retirement savings total?",
      answer: "Include all assets earmarked for retirement: 401(k)s, IRAs, taxable investment accounts, and any other savings you plan to use in retirement."
    },
    {
      question: "What percentage of income should I save for retirement yearly?",
      answer: "Financial experts often recommend saving 10-15% of your income for retirement, but this can vary based on your age and retirement goals."
    },
    {
      question: "How does the calculator handle Social Security benefits?",
      answer: "Most calculators allow you to input an estimated Social Security benefit. Some may also provide tools to estimate this based on your current income."
    }
  ];

  return (
    <section className="mt-16">
      <h2 className="section-title text-center">Frequently Asked Questions</h2>
      <div className="mt-8 space-y-4 max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="card transition-all duration-200 hover:shadow-lg"
          >
            <button
              className="w-full text-left flex justify-between items-center p-4"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <h3 className="text-lg font-semibold text-gray-900 pr-8">
                {faq.question}
              </h3>
              <ChevronDown
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 flex-shrink-0 ${
                  openIndex === index ? 'transform rotate-180' : ''
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-200 ${
                openIndex === index ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <p className="px-4 pb-4 text-gray-600">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FAQSection;