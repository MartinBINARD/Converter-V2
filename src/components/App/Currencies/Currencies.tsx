import React, { useState } from 'react';
import { Currency } from '../../../@types';

import './Currencies.scss';

interface CurrenciesProps {
  currencies: Currency[];
}

function Currencies({ currencies }: CurrenciesProps) {
  const [search, setSearch] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const filteredList = currencies.filter((currency) => {
    // Si champ vide = j'affiche tout
    if (!search.length) {
      return true;
    }

    return currency.description
      .toLowerCase()
      .includes(search.trim().toLocaleLowerCase());
  });

  const items = filteredList.map((currency) => (
    <li className="currencies-list-item" key={currency.description}>
      {currency.description}
    </li>
  ));

  return (
    <section className="currencies">
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
    </section>
  );
}

export default Currencies;
