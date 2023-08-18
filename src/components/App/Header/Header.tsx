import Toggler from '../Toggler/Toggler';
import './Header.scss';

interface HeaderPorps {
  baseAmount: number;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Header({ baseAmount, isOpen, setIsOpen }: HeaderPorps) {
  return (
    <header className="header">
      <h1 className="header-title">Converter</h1>
      <p className="header-amount">{baseAmount} euro</p>

      <Toggler isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
}

export default Header;
