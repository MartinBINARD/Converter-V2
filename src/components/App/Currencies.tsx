import { useState } from 'react';

import { Currency } from '../../@types';

interface CurrenciesProps {
  currencies: Currency[];
  setCurrency: React.Dispatch<React.SetStateAction<Currency>>;
}

function Currencies({ currencies, setCurrency }: CurrenciesProps) {
  /*
    Je veux filtrer mes devises en fonction de la valeur
    d'un champ de formulaire

    En REACT, on CONTRÔLE nos champs ; i.e. on les gère en React.

    > https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable

    Pour ça :
    1. on crée un état → useState
    2. on traduit la valeur de notre état dans notre champ → value
    3. on permet à l'utilisateur de modifier cet état → onChange
  */
  const [search, setSearch] = useState('');

  /*
    Pour typer un évènement, on a besoin de 2 informations :
    - le type d'évènement
    - l'élément
  
    Syntaxe :
    `React.TypeOfTheEvent<TypeOfTheElement>`

    > https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/

    ASTUCE :
    quand on crée le _handler_ sur l'évènement (`oncHange={handleChange}`),
    survoler l'erreur « Cannot find name » puis cliquer sur
    « Quick Fix > Add missing function declaration »
    → ne pas oublier d'importer React ou de l'ajouter au type :
    ChangeEvent devient React.ChangeEvent
  */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // j'affiche mon intention
    // console.log(
    //   'je veux modifier la valeur de mon état avec la saisie utilisateur'
    // );
    // je traduis mon intention
    setSearch(event.target.value);
  };

  // À chaque rendu (= chaque saisie utilisateur),
  // je filtre ma liste des devises en fonction
  // de la valeur de `search`
  const filteredList = currencies.filter((currency) => {
    // quand le champ est vide, j'affiche tout
    if (!search.trim().length) {
      return true;
    }

    // est-ce que la description de ma devise contient ma recherche ?
    return currency.description
      .toLowerCase()
      .includes(search.trim().toLowerCase());
  });

  const handleClick = (currency: Currency) => {
    // j'affiche mon intention
    // console.log('je clique sur une devise');
    // je modifie mon état avec la devise cliquée :
    setCurrency(currency);
  };

  // Navigation clavier
  // https://felixgerschau.com/react-typescript-events/ (event in TS)
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    currency: Currency
  ) => {
    // un fois que l'élément a le focus
    if (event.code === 'Enter') {
      // si on tape `Entrée`, on appelle `handleClick()`
      handleClick(currency);
    }
  };

  const items = filteredList.map((currency) => (
    /*
      On veut rendre notre élément `<li>` cliquable
      mais ce n'est pas un élément interactif !

      On suit ESLint (et sa doc) pour le rendre interactif ET accessible :

      - on associe un évènement clavier (keydown, keypress, keyup…)
        → https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/f0d2ddb65f21278ad29be43fb167a1092287b4b1/docs/rules/click-events-have-key-events.md
      - on lui donne un ARIA-rôle (role="button")
        → https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/f0d2ddb65f21278ad29be43fb167a1092287b4b1/docs/rules/no-noninteractive-element-interactions.md
      - on ne peut pas rendre un élément non-interactif en interactif en utilisant le role ;
        on ajoute une div…
        → https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/f0d2ddb65f21278ad29be43fb167a1092287b4b1/docs/rules/no-noninteractive-element-to-interactive-role.md
      - on lui donne le focus (tabIndex)
        → https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/f0d2ddb65f21278ad29be43fb167a1092287b4b1/docs/rules/interactive-supports-focus.md
    */
    <li key={currency.code} className="currency">
      <div
        onClick={() => handleClick(currency)}
        // un élément non-interactif doit avoir un évènement clavier associé
        onKeyDown={(event) => handleKeyDown(event, currency)}
        // on prévient que notre `<li>` va se comporter comme un bouton
        role="button"
        // on permet le focus sut l'élément
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
        // je traduis/j'affiche la valeur de mon état dans le champ
        value={search}
        // je permets la modification de mon état
        onChange={handleChange}
      />

      <ul className="currencies-list">{items}</ul>
    </div>
  );
}

export default Currencies;
