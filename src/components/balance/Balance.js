import { createSelector } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { formatCur } from '../../services/Format/formatCurrency';

const Balance = () => {
  const movements = useSelector((state) => state.user.user.movements);
  const locale = useSelector((state) => state.user.user.locale);
  const currency = useSelector((state) => state.user.user.currency);

  const calcBalance = (movements) => {
    const balance = movements.reduce((acc, mov) => acc + mov, 0);
    return formatCur(balance, locale, currency);
  };

  const currentDate = () => {
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };

    return new Intl.DateTimeFormat(locale, options).format(now);
  };

  return (
    <div className="balance">
      <div>
        <p className="balance__label">Current balance</p>
        <p className="balance__date">
          As of <span className="date">{currentDate()}</span>
        </p>
      </div>
      <p className="balance__value">{calcBalance(movements)}</p>
    </div>
  );
};

export default Balance;
