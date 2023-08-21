import { useState } from 'react';

import Counter from './Counter';
import Currencies from './Currencies';
import Header from './Header';
import Result from './Result';

import currencies from '../../data/currencies';

import { Currency } from '../../@types';

import './App.scss';

/*
TEST
  On va ajouter un Toggler pour afficher/masquer
  la liste des devises

  Au clic, on va :
  - ajouter/retirer une classe `open` sur le bouton
  - afficher/masquer la liste

  étapes :
  1. on utilise un état (ouvert/fermé) → useState
  2. où créer cet état ? local ? partagé entre plusieurs composants ?
  3. initialisation
  4. diffusion
  5. lecture
  6. modification
    - on pose un évènement (clic sur Toggler)
    - on crée la fonction pour modifier l'état
*/
function App() {
  const [count, setCount] = useState(0);

  // État : liste ouverte/fermée
  // ouvert à l'initialisation
  const [isOpen, setIsOpen] = useState(true);

  // const currentCurrency = currencies[16];
  // État : devise courante à convertir
  // je suis plus précis que l'inférence TS,
  // je force le type Currency grâce à `useState<MyType>(value)`
  const [currency, setCurrency] = useState<Currency>(currencies[0]);

  // État : montant à convertir
  const [amount, setAmount] = useState(10);

  // Conversion
  function makeConversion() {
    return amount * currency.rate;
  }

  return (
    <div className="App">
      <Header
        baseAmount={amount}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setAmount={setAmount}
      />

      {/* {!isOpen ? <Currencies currencies={currencies} /> : false} */}
      {/*
        Je veux afficher ou non ma liste en fonction de isOpen
          - isOpen = true → j'affiche
          - isOpen = false → je n'affiche pas

        Pour faire ça, on va utiliser les « vues conditionnelles »
        en s'aidant du ET logique `&&`
        https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Logical_AND

        ```js
        const a = true; // ou truthy ; ex : 3
        const b = false; // ou falsy ; ex : 0

        console.log(a && 'value');
        // Expected output: 'value'
        console.log(b && 'value');
        // Expected output: false
        ```
        Dans le cas de React :

        ```js
        {true && <Element />} va afficher l'élément
        {false && <Element />} va afficher `false` (donc rien)
        ```
        Note : attention sous React, l'opérande de gauche
        DOIT être `false` au risque d'afficher la valeur `falsy`
        ex : si on donne `0`, il affichera un `0`
        Si on a pas de booléen on fait une condition ;
        ex : {array.length > 0 && <List />}
      */}
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
