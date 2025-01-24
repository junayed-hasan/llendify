import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Receipt, 
  CreditCard,
  AlertCircle,
  ChevronDown
} from 'lucide-react';

const iconMap = {
  deposits: TrendingUp,
  withdrawals: TrendingDown,
  regularBills: Receipt,
  loans: CreditCard,
  recommendation: AlertCircle,
};

const colorMap = {
  deposits: "bg-emerald-50 border-emerald-200 text-emerald-700",
  withdrawals: "bg-rose-50 border-rose-200 text-rose-700",
  regularBills: "bg-amber-50 border-amber-200 text-amber-700",
  loans: "bg-purple-50 border-purple-200 text-purple-700",
  recommendation: "bg-green-50 border-green-200 text-green-700",
};

const titleMap = {
  deposits: "Monthly Deposits",
  withdrawals: "Monthly Withdrawals",
  regularBills: "Regular Bills",
  loans: "Loans and Debts",
  recommendation: "Loan Recommendation",
};

const InsightCard = ({ type, content }) => {
  const [isExpanded, setIsExpanded] = React.useState(type === 'recommendation');
  const Icon = iconMap[type];
  const colorClass = colorMap[type];
  const title = titleMap[type];

  return (
    <div 
      className={`rounded-lg border p-4 transition-all duration-200 ${colorClass}`}
      style={{ opacity: 0, animation: 'fadeIn 0.5s ease-out forwards' }}
    >
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-white/80">
            <Icon className="w-5 h-5" />
          </div>
          <h3 className="font-semibold">{title}</h3>
        </div>
        <ChevronDown 
          className={`w-5 h-5 transition-transform duration-200 ${
            isExpanded ? 'transform rotate-180' : ''
          }`} 
        />
      </div>
      
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isExpanded ? 'mt-4 max-h-96' : 'max-h-0'
        }`}
      >
        <div className="space-y-2 text-sm">
          {content.split('\n').map((line, index) => (
            line.trim() && (
              <p key={index} className="leading-relaxed">
                {line.trim()}
              </p>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default InsightCard;