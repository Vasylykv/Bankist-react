const Summary = () => {
  const downArrow = String.fromCodePoint(8595);

  return (
    <div class="summary">
      <p class="summary__label">In</p>
      <p class="summary__value summary__value--in">0000€</p>
      <p class="summary__label">Out</p>
      <p class="summary__value summary__value--out">0000€</p>
      <p class="summary__label">Interest</p>
      <p class="summary__value summary__value--interest">0000€</p>
      <button class="btn--sort">{downArrow} SORT</button>
    </div>
  );
};

export default Summary;
