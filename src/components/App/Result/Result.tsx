import { Currency } from '../../../@types';

import './Result.scss';

interface ResultProps {
  currency: Currency;
}

function Result({ currency }: ResultProps) {
  return (
    <header className="result">
      <span className="result-value">{currency.rate.toFixed(2)}</span>
      <span className="result-currency">{currency.description}</span>
    </header>
  );
}

export default Result;
