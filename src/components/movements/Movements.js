import { useSelector } from 'react-redux';
import { useState } from 'react';
import { formatCur } from '../../services/Format/formatCurrency';

const Movements = () => {
  const movements = useSelector((state) => state.user.user.movements);
  const movementsDates = useSelector((state) => state.user.user.movementsDates);
  const locale = useSelector((state) => state.user.user.locale);
  const currency = useSelector((state) => state.user.user.currency);

  const [sort, setSort] = useState(false);

  const formatMovementDate = function (date, locale) {
    const calcDaysPassed = (data1, date2) =>
      Math.round(Math.abs(date2 - data1) / (1000 * 60 * 60 * 24));

    const daysPassed = calcDaysPassed(new Date(), date);

    if (daysPassed === 0) return 'Today';
    if (daysPassed === 1) return 'Yesterday';
    if (daysPassed <= 7) return `${daysPassed} days ago`;

    return new Intl.DateTimeFormat(locale).format(date);
  };

  const renderMovements = function () {
    const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

    return movs.map(function (mov, i) {
      const type = mov > 0 ? 'deposit' : 'withdrawal';

      const date = new Date(movementsDates[i]);
      const displayDate = formatMovementDate(date, locale);

      const formattedMov = formatCur(mov, locale, currency);

      const styles = `movements__type movements__type--${type}`;

      return (
        <div key={i} className="movements__row">
          <div className={styles}>
            ${i + 1} ${type}
          </div>
          <div className="movements__date">{displayDate}</div>
          <div className="movements__value">{formattedMov}</div>
        </div>
      );
    });
  };

  return <div className="movements">{renderMovements()}</div>;
};

export default Movements;
