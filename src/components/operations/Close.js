import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux/es/exports';
import * as Yup from 'yup';
import { closeAccount } from '../../slices/userSlice';

const Close = () => {
  const dispatch = useDispatch();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email().required('This field is required'),
    password: Yup.string().required('This field is required'),
  });

  const handleSubmit = (formValue) => {
    const { email, password } = formValue;
    dispatch(closeAccount({ email, password }));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <div className="operation operation--close">
        <h2>Close account</h2>
        <Form className="form form--close">
          <Field
            name="email"
            type="email"
            required
            className="form__input form__input--user"
          />
          <Field
            name="password"
            type="password"
            required
            maxLength="6"
            className="form__input form__input--pin"
          />
          <button type="submit" className="form__btn form__btn--close">
            &rarr;
          </button>
          <label name="email" className="form__label">
            Confirm user
          </label>
          <label name="pass" className="form__label">
            Confirm PIN
          </label>
        </Form>
      </div>
    </Formik>
  );
};

export default Close;
