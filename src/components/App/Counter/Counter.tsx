interface CounterProps {
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

function Counter({ setCount }: CounterProps) {
  return (
    <button
      type="button"
      onClick={() => {
        setCount((count) => count + 1);
      }}
    >
      Incrémenter de 1
    </button>
  );
}

export default Counter;
