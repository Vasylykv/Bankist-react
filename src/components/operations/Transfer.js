import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { makeTransfer } from '../../slices/userSlice';

const Transfer = () => {
  const dispatch = useDispatch();

  const initialValues = {
    email: '',
    amount: 0,
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('This field is required!'),
    amount: Yup.number().required('This field is required'),
  });

  const handleTransfer = (formValue) => {
    const { email, amount } = formValue;
    console.log(JSON.stringify(formValue, null, 2));
    dispatch(makeTransfer({ email, amount }));
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleTransfer}
    >
      <div className="operation operation--transfer">
        <h2>Transfer money</h2>
        <Form className="form form--transfer">
          <Field
            type="email"
            name="email"
            className="form__input form__input--to"
            required
          />
          <Field
            type="number"
            className="form__input form__input--amount"
            name="amount"
            required
          />
          <button type="submit" className="form__btn form__btn--transfer">
            &rarr;
          </button>
          <label className="form__label">Transfer to</label>
          <label className="form__label">Amount</label>
        </Form>
      </div>
    </Formik>
  );
};

export default Transfer;
