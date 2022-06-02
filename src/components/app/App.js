import React from 'react';
import NavigationPanel from '../navigation/Navigation';
import Balance from '../balance/Balance';
import Movements from '../movements/Movements';
import Summary from '../summary/Summary';
import Operations from '../operations/Operations';
import Timer from '../timer/Timer';

function App() {
  return (
    <>
      <NavigationPanel />
      <main className="app">
        <Balance />
        <Movements />
        <Summary />
        <Operations />
        <Timer />
      </main>
    </>
  );
}

export default App;
