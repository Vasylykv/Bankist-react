import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { clearMessage } from '../../slices/message';
import Spinner from '../spinner/Spinner';

import { fetchUser } from '../../slices/userSlice';

import logo from '../../assets/logo.png';

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.user);
  // const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().email().required('This field is required!'),
    password: Yup.string().required('This field is required'),
  });

  const handleLogin = (formValue) => {
    const { username, password } = formValue;
    setLoading(true);
    dispatch(fetchUser({ email: username, password }));
    // dispatch(login({ email: username, password }))
    //   .unwrap()
    //   .then(() => {
    //     props.history.push('/profile');
    //     window.location.reload();
    //   })
    //   .catch(() => {
    //     setLoading(false);
    //   });
  };

  if (isLoggedIn) {
    return <Redirect to="/profile" />;
  }

  return (
    <nav>
      <p className="welcome">Log in to get started</p>
      <img src={logo} alt="Logo" className="logo" />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        <Form className="login">
          {/* <input
            type="text"
            placeholder="user"
            className="login__input login__input--user"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          /> */}
          <Field
            name="username"
            type="text"
            className="login__input login__input--user"
            placeholder="user"
          />

          {/* <input
            type="text"
            placeholder="PIN"
            maxLength="4"
            className="login__input login__input--pin"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          /> */}
          <Field
            name="password"
            type="password"
            placeholder="pass"
            className="login__input login__input--pin"
          />

          <button className="login__btn" disabled={loading && <Spinner />}>
            &rarr;
          </button>
        </Form>
      </Formik>
    </nav>
  );
};

export default Login;
