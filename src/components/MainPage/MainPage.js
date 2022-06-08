import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Balance from '../balance/Balance';
import Movements from '../movements/Movements';
import Summary from '../summary/Summary';
import Operations from '../operations/Operations';
import Timer from '../timer/Timer';
import { logout } from '../../slices/userSlice';

const MainPage = () => {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.user);
  if (!currentUser) {
    return <Redirect to="/" />;
  }

  const handleLogOut = () => {
    dispatch(logout());
  };

  return (
    <main className="app">
      <Balance />
      <Movements />
      <Summary />
      <Operations />
      <Timer />
      <button onClick={handleLogOut}>Log out</button>
    </main>
  );
};

export default MainPage;
