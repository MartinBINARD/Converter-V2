import { useEffect, useState } from 'react';

import Counter from './Counter';
import Currencies from './Currencies';
import Header from './Header';
import Result from './Result';

// import currenciesData from '../../data/currencies';

import { Currency } from '../../@types';

import './App.scss';

/*
  Objectif :
  récupérer les devises depuis une API pour les afficher dans la liste
  
  > https://exchangerate.host/#/

  - fetch / Axios (on le verra plus tard)
  - gérer la liste des devises → variable d'état
*/

function App() {
  const [count, setCount] = useState(0);
  const [isOpen, setIsOpen] = useState(true);
  const [amount, setAmount] = useState(10);

  // État : la liste des devises
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  // au montage, je n'ai pas de devises, donc pas de devise par défaut
  // on force TS à « accepter » `null` ET `Currency`
  // → on utilise le `|` (= union)
  const [currency, setCurrency] = useState<Currency | null>(null);

  // État : résultat de la conversion
  const [total, setTotal] = useState(0);

  // remplacée par appel API
  // function makeConversion() {
  //   return amount * currency.rate;
  // }

  // https://react.dev/reference/react/useEffect
  // https://www.w3schools.com/react/react_useeffect.asp
  // voir __docs/react_hook_lifecycle.png

  // useEffect(() => {
  //   console.log(
  //     "ce CB est appelé au 1er rendu et à chaque modification de l'application"
  //   );
  // });

  // useEffect(() => {
  //   console.log('ce CB est appelé au 1er rendu UNIQUEMENT');
  // }, []); // tableau des dépendances vide

  // useEffect(() => {
  //   console.log(
  //     'ce CB est appelé au 1er rendu ET à chaque fois que COUNT EST MODIFIÉ'
  //   );
  // }, [count]); // tableau des dépendances avec un state et/ou une prop

  // useEffect(() => {
  //   console.log(
  //     'ce CB est appelé au 1er rendu ET à chaque fois que AMOUNT ET ISOPEN SONT MODIFIÉS'
  //   );
  //   console.log(amount);
  // }, [amount, isOpen]); // tableau des dépendances avec plusieurs state

  /*
    Objectif : modifier le titre de l'onglet
    (document.title = '....')
    à chaque fois qu'on clique sur une devise

    notion : useEffect
  */
  useEffect(() => {
    if (currency) {
      document.title = `EUR to ${currency.code} converter`;
    }
  }, [currency]); // au 1er rendu et à chaque modification de currency

  /*
    1. on appelle le composant App (mount)
    2. on fetch 'asynchrone, ça prend un peu de temps)
    3. on rend le composant (return)
    4. la réponse de l'API est arrivée
      → setCurrencies > update
    5. on re-rend le composant
    6. on re-fetch
    7. on re-re-rend le composant
    8. on re-re-fetch
    
    on boucle sur les étapes 2-3-4 → BOUCLE INFINIE !!!

    Pour éviter ça, on va dire de faire le fetch UNIQUEMENT au 1er rendu
    → useEffect(fetch, [])
  */
  useEffect(() => {
    // fetch('https://api.exchangerate.host/symbols')
    //   .then((response) => response.json())
    //   .then((data) => {
    //     // console.log(data.symbols);
    //     // console.log(Object.values(data.symbols));
    //     setCurrencies(Object.values(data.symbols));
    //   })
    //   .catch((err) => console.error(err));

    // un callback DOIT ÊTRE SYNCHRONE
    // pour utiliser async/await, je crée une fonction asynchrone que
    // j'appelle immédiatement (voir erreur dans console ou VS Code)
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.exchangerate.host/symbols');
        const data = await response.json();

        const symbols: Currency[] = Object.values(data.symbols);

        setCurrencies(symbols);
        setCurr;
        setCurrency(symbols[0]);
      } catch (err) {
        // console.error(err);
      }
    };

    fetchData();
  }, []); // UNIQUEMENT au premier rendu

  useEffect(() => {
    async function fetchTotal() {
      if (currency) {
        try {
          const response = await fetch(
            `https://api.exchangerate.host/convert?from=EUR&to=${currency.code}&amount=${amount}`
          );
          const data = await response.json();

          setTotal(data.result);
        } catch (err) {
          // console.error(err);
        }
      }
    }

    fetchTotal();
  }, [amount, currency]); // à chaque modification de AMOUNT et CURRENCY

  return (
    <div className="App">
      <Header
        baseAmount={amount}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setAmount={setAmount}
      />

      {isOpen && <Currencies list={currencies} setCurrency={setCurrency} />}

      <Result currency={currency} total={total} />

      <Counter setCount={setCount} />
      <p>TEST : {count}</p>
    </div>
  );
}

export default App;
