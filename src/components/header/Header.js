import { useState } from 'react';


import logo from '../../assets/logo.png';

const Header = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState();

  

  return (
    <nav>
      <p class="welcome">Log in to get started</p>
      <img src={logo} alt="Logo" class="logo" />
      <form class="login">
        <input
          type="text"
          placeholder="user"
          class="login__input login__input--user"
          onChange={setUsername}
          value={username}
        />

        <input
          type="text"
          placeholder="PIN"
          maxlength="4"
          class="login__input login__input--pin"
          onChange={setPassword}
          value={password}
        />
        <button class="login__btn">&rarr;</button>
      </form>
    </nav>
  );
};

export default Header;
