import { useEffect, useState } from 'react';

import { Currency } from '../../@types';

interface CurrenciesProps {
  currencies: Currency[];
  setCurrency: React.Dispatch<React.SetStateAction<Currency>>;
}

/*
  Objectif : modifier le titre de l'onglet
  (document.title = '....')
  à chaque fois qu'on clique sur une devise

  notion : useEffect
*/

function Currencies({ currencies, setCurrency }: CurrenciesProps) {
  const [search, setSearch] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const filteredList = currencies.filter((currency) => {
    if (!search.trim().length) {
      return true;
    }

    return currency.description
      .toLowerCase()
      .includes(search.trim().toLowerCase());
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
    <li key={currency.code} className="currency">
      <div
        onClick={() => handleClick(currency)}
        onKeyDown={(event) => handleKeyDown(event, currency)}
        role="button"
        tabIndex={0}
      >
        {currency.description}
      </div>
    </li>
  ));

  // Objectif : je veux donner le focus à mon filtre de devises
  // au clic sur body
  // → je dois cibler dans le DOM réel mon input
  // → je dois passer par un useEffect
  useEffect(() => {
    console.log('useEffect!');

    const onBodyClick = () => {
      console.log('clicked!');
      document.querySelector<HTMLInputElement>('.currencies-search')?.focus();
    };

    document.body.addEventListener('click', onBodyClick);

    // fonction de clean-up
    // pour supprimer un effet lorsque le composant est démonté
    // (unmount)
    return () => {
      console.log('CURRENCIES unmounted!');
      document.body.removeEventListener('click', onBodyClick);
    };
  }, []); // seulement au 1er rendu

  return (
    <div className="currencies">
      <input
        type="search"
        className="currencies-search"
        placeholder="Search a currency…"
        aria-label="Search a currency"
        value={search}
        onChange={handleChange}
      />

      <ul className="currencies-list">{items}</ul>
    </div>
  );
}

export default Currencies;
