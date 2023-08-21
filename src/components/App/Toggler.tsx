interface TogglerProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Toggler({ isOpen, setIsOpen }: TogglerProps) {
  const handleClick = () => {
    // j'affiche mon intention
    console.log('Je veux modifier la valeur de mon état isOpen');
    // je traduis mon intention :
    // la nouvelle valeur est l'inverse de la valeur courante
    setIsOpen(!isOpen);
  };

  return (
    <div className="toggler">
      <button
        type="button"
        className={isOpen ? 'toggler-btn toggler-btn--open' : 'toggler-btn'}
        onClick={handleClick}
      >
        <span />
        <span />
        <span />
      </button>
    </div>
  );
}

export default Toggler;
