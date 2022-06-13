import { useSelector } from 'react-redux';
import { formatCur } from '../../services/Format/formatCurrency';

const Summary = ({ handleToggleSort }) => {
  const downArrow = String.fromCodePoint(8595);

  const movements = useSelector((state) => state.user.user.movements);
  const locale = useSelector((state) => state.user.user.locale);
  const currency = useSelector((state) => state.user.user.currency);
  const interestRate = useSelector((state) => state.user.user.interestRate);

  const calcIncomes = () => {
    const incomes = movements
      .filter((mov) => mov > 0)
      .reduce((acc, mov) => acc + mov);

    return formatCur(incomes, locale, currency);
  };

  const calcOutcomes = () => {
    const out = movements
      .filter((mov) => mov < 0)
      .reduce((acc, mov) => acc + mov);

    return formatCur(Math.abs(out), locale, currency);
  };

  const calcInterest = () => {
    const interest = movements
      .filter((mov) => mov > 0)
      .map((deposit) => (deposit * interestRate) / 100)
      .filter((int, i, arr) => {
        return int >= 1;
      })
      .reduce((acc, int) => acc + int, 0);

    return formatCur(interest, locale, currency);
  };

  return (
    <div className="summary">
      <p className="summary__label">In</p>
      <p className="summary__value summary__value--in">{calcIncomes()}</p>
      <p className="summary__label">Out</p>
      <p className="summary__value summary__value--out">{calcOutcomes()}</p>
      <p className="summary__label">Interest</p>
      <p className="summary__value summary__value--interest">
        {calcInterest()}
      </p>
      <button onClick={handleToggleSort} className="btn--sort">
        {downArrow} SORT
      </button>
    </div>
  );
};

export default Summary;
