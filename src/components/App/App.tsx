import { useEffect, useState } from 'react';

import Counter from './Counter';
import Currencies from './Currencies';
import Header from './Header';
import Result from './Result';

import currencies from '../../data/currencies';

import { Currency } from '../../@types';

import './App.scss';

function App() {
  const [count, setCount] = useState(0);
  const [isOpen, setIsOpen] = useState(true);
  const [currency, setCurrency] = useState<Currency>(currencies[0]);
  const [amount, setAmount] = useState(10);

  function makeConversion() {
    return amount * currency.rate;
  }

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

  return (
    <div className="App">
      <Header
        baseAmount={amount}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setAmount={setAmount}
      />

      {isOpen && (
        <Currencies currencies={currencies} setCurrency={setCurrency} />
      )}

      <Result currency={currency} total={makeConversion()} />

      <Counter setCount={setCount} />
      <p>TEST : {count}</p>
    </div>
  );
}

export default App;
