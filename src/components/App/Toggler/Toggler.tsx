interface TogglerProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Toggler({ isOpen, setIsOpen }: TogglerProps) {
  const handleClick = () => {
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
