// import React, { useEffect } from 'react';
// import { withFormik, Form, Field, FormikProps, FormikErrors } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';
// import { User } from '../App';

// interface LoginValues {
//   name: string;
//   email: string;
//   password: string;
//   role: 'frontend' | 'backend' | 'web' | 'unassigned';
//   tos: boolean;
// }

// interface LoginProps {
//   initialName?: string;
//   initialEmail?: string;
//   initialPassword?: string;
//   initialRole?: 'frontend' | 'backend' | 'web' | 'unassigned';
//   initialTos?: boolean;
//   setUsers: (users: (u: User[]) => User[]) => void;
//   users: User[];
// }

// interface OtherProps {
//   setUsers: (users: (u: User[]) => User[]) => void;
//   users: User[];
// }

// const LoginForm = ({
//   values,
//   touched,
//   errors,
//   status,
//   setUsers,
// }: OtherProps & FormikProps<LoginValues>): React.ReactElement => {
//   useEffect((): void => {
//     if (status) {
//       setUsers((u): User[] => [...u, status]);
//     }
//   }, [status, setUsers]);

//   return (
//     <Form className="register-form">
//       <div className="bx--form-item">
//         {touched.name && errors.name && <p className="error">{errors.name}</p>}
//         <Field
//           className="bx--text-input"
//           type="name"
//           name="name"
//           placeholder="Name"
//         />
//       </div>
//       {touched.email && errors.email && <p className="error">{errors.email}</p>}
//       <Field
//         className="bx--text-input"
//         type="email"
//         name="email"
//         placeholder="Email"
//       />
//       {touched.password && errors.password && (
//         <p className="error">{errors.password}</p>
//       )}
//       <Field
//         className="bx--text-input"
//         type="password"
//         name="password"
//         placeholder="Password"
//       />
//       <Field className="bx--text-input" component="select" name="role">
//         <option className="bx--select-option">Select a role</option>
//         <option className="bx--select-option" value="web">
//           Web UI Developer
//         </option>
//         <option className="bx--select-option" value="frontend">
//           Front End Engineer
//         </option>
//         <option className="bx--select-option" value="backend">
//           Back End Engineer
//         </option>
//       </Field>
//       <div className="bx--form-item bx--checkbox-wrapper">
//         {touched.tos && errors.tos && <p className="error">{errors.tos}</p>}
//         <label htmlFor="tos">Accept Terms of Service</label>
//         <Field id="tos" type="checkbox" name="tos" checked={values.tos} />
//       </div>
//       <Button type="submit">Register</Button>
//     </Form>
//   );
// };

// const FormikLoginForm = withFormik<LoginProps, LoginValues>({
//   mapPropsToValues({
//     initialName,
//     initialEmail,
//     initialPassword,
//     initialRole,
//     initialTos,
//   }: LoginProps): LoginValues {
//     return {
//       name: initialName || '',
//       email: initialEmail || '',
//       password: initialPassword || '',
//       role: initialRole || 'unassigned',
//       tos: initialTos || false,
//     };
//   },

//   validate: (
//     values: LoginValues,
//     props: LoginProps
//   ): FormikErrors<LoginValues> => {
//     const emailExists = props.users.find(
//       (user): boolean => user.email === values.email
//     );
//     const errors: FormikErrors<LoginValues> = {};

//     if (emailExists) {
//       errors.email = 'This email is already taken';
//     }
//     return errors;
//   },

//   validationSchema: Yup.object().shape({
//     name: Yup.string().required('Please enter a name'),
//     email: Yup.string()
//       .email('Please enter a valid email address')
//       .required('Please enter a email address'),
//     password: Yup.string()
//       .min(8, 'Password must be at least 8 characters')
//       .required('Please enter a password'),
//     tos: Yup.boolean()
//       .oneOf([true], 'Please accept the Terms of Service')
//       .required(),
//   }),

//   async handleSubmit(values, { setStatus }): Promise<void> {
//     try {
//       const registerUser = await axios.post(
//         'https://reqres.in/api/users/',
//         values
//       );
//       setStatus(registerUser.data);
//     } catch (err) {
//       console.log(err);
//     }
//   },
// })(LoginForm);

// export default FormikLoginForm;
