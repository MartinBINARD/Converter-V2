import { useState } from 'react';

import Header from './Header/Header';
import Currencies from './Currencies/Currencies';
import Result from './Result/Result';

import currencies from '../../data/currencies';

import './App.scss';

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [convertCurrency, setConvertCurrency] = useState(currencies[1]);

  return (
    <div className="App">
      <Header baseAmount={1} isOpen={isOpen} setIsOpen={setIsOpen} />
      {isOpen && (
        <Currencies
          currencies={currencies}
          convertCurrency={convertCurrency}
          setConvertCurrency={setConvertCurrency}
        />
      )}
      <Result currency={convertCurrency} />
    </div>
  );
}

export default App;
