import { Currency } from '../../@types';

interface ResultProps {
  currency: Currency;
  total: number;
}

function Result({ currency, total }: ResultProps) {
  return (
    <div className="result">
      <span className="result-value">{total.toFixed(2)}</span>
      <span className="result-currency">{currency.description}</span>
    </div>
  );
}

export default Result;
