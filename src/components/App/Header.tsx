import Toggler from './Toggler';

interface HeaderProps {
  baseAmount: number;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
}

function Header({ baseAmount, isOpen, setIsOpen, setAmount }: HeaderProps) {
  return (
    <header className="header">
      <h1 className="header-title">Converter</h1>

      <p className="header-amount">
        {/* je remplace par un input contrôlé */}
        <input
          type="number"
          className="header-amount__input"
          min={0}
          // je traduis mon état
          value={baseAmount}
          // je modifie mon état
          onChange={(event) => setAmount(Number(event.target.value))}
        />
        euro
      </p>

      <Toggler isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
}

export default Header;
