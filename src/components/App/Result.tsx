import { Currency } from '../../@types';

interface ResultProps {
  currency: Currency | null;
  total: number;
}

function Result({ currency, total }: ResultProps) {
  return (
    <div className="result">
      <span className="result-value">{total ? total.toFixed(2) : ''}</span>
      <span className="result-currency">
        {currency ? currency.description : '–'}
      </span>
    </div>
  );
}

export default Result;
