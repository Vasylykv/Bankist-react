import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Balance from '../balance/Balance';
import Movements from '../movements/Movements';
import Summary from '../summary/Summary';
import Operations from '../operations/Operations';
import Timer from '../timer/Timer';
import { logout } from '../../slices/userSlice';

const UserPage = () => {
  const [sortMovements, setSortMovements] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  const handleLogOut = () => {
    dispatch(logout());
  };

  const handleToggleSort = () => {
    setSortMovements(!sortMovements);
  };

  return (
    <main className="app">
      <Balance />
      <Movements sortMovements={sortMovements} />
      <Summary handleToggleSort={handleToggleSort} />
      <Operations />
      <Timer />
      <button onClick={handleLogOut}>Log out</button>
    </main>
  );
};

export default UserPage;
