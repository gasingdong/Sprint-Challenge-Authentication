import React from 'react';
import { withFormik, Form, Field, FormikProps } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

interface LoginValues {
  username: string;
  password: string;
}

interface LoginProps {
  initialUsername?: string;
  initialPassword?: string;
}

const LoginForm = ({
  touched,
  errors,
}: FormikProps<LoginValues>): React.ReactElement => {
  return (
    <Form>
      <div>
        {touched.username && errors.username && <p>{errors.username}</p>}
        <Field type="username" name="username" placeholder="Username" />
      </div>
      {touched.password && errors.password && <p>{errors.password}</p>}
      <Field type="password" name="password" placeholder="Password" />
      <button type="submit">Login</button>
    </Form>
  );
};

const FormikLoginForm = withFormik<LoginProps, LoginValues>({
  mapPropsToValues({
    initialUsername,
    initialPassword,
  }: LoginProps): LoginValues {
    return {
      username: initialUsername || '',
      password: initialPassword || '',
    };
  },

  validationSchema: Yup.object().shape({
    username: Yup.string().required('Please enter a username'),
    password: Yup.string().required('Please enter a password'),
  }),

  async handleSubmit(values, { setStatus }): Promise<void> {
    try {
      const loginUser = await axios.post(
        'http://localhost:3300/api/auth/login',
        values
      );
      console.log(loginUser);
    } catch (err) {
      console.log(err);
    }
  },
})(LoginForm);

export default FormikLoginForm;
