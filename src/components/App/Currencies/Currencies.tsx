import { useState } from 'react';
import { Currency } from '../../../@types';

import './Currencies.scss';

interface CurrenciesProps {
  currencies: Currency[];
  setCurrency: React.Dispatch<React.SetStateAction<Currency>>;
}

function Currencies({ currencies, setCurrency }: CurrenciesProps) {
  const [search, setSearch] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const filteredList = currencies.filter((currency: Currency) => {
    // Si champ vide = j'affiche tout
    if (!search.trim().length) {
      return true;
    }

    return currency.description
      .toLowerCase()
      .includes(search.trim().toLocaleLowerCase());
  });

  const handleClick = (currency: Currency) => {
    setCurrency(currency);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    currency: Currency
  ) => {
    if (event.code === 'Enter') {
      handleClick(currency);
    }
  };

  const items = filteredList.map((currency) => (
    <li key={currency.code} className="currencies-list-item">
      <div
        onClick={() => handleClick(currency)}
        onKeyDown={(event) => handleKeyDown(event, currency)}
        role="button"
        // on permet le focus sur l'élement
        tabIndex={0}
      >
        {currency.description}
      </div>
    </li>
  ));

  return (
    <div className="currencies">
      {/* <h2 className="currencies-title">Currencies</h2> */}
      <input
        type="search"
        className="currencies-search"
        placeholder="Search a currency…"
        // on pense Accessibilité :
        // on a pas de label, on en « ajoute un » pour les lecteurs d'écran
        // https://developer.mozilla.org/fr/docs/Web/Accessibility/ARIA
        // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
        aria-label="Search a currency"
        value={search}
        onChange={handleChange}
      />

      <ul className="currencies-list">{items}</ul>
    </div>
  );
}

export default Currencies;
