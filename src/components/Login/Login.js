import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Spinner from '../spinner/Spinner';

import { fetchUser } from '../../slices/userSlice';

import logo from '../../assets/logo.png';

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();

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
          <Field
            name="username"
            type="email"
            className="login__input login__input--user"
            placeholder="user"
            required
          />
          {/* <ErrorMessage component="div" className="error" name="username" /> */}

          <Field
            name="password"
            type="password"
            placeholder="pass"
            className="login__input login__input--pin"
            required
          />
          {/* <ErrorMessage component="div" className="error" name="password" /> */}

          <button className="login__btn" disabled={loading && <Spinner />}>
            &rarr;
          </button>
        </Form>
      </Formik>
    </nav>
  );
};

export default Login;
