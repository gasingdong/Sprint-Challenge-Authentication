import React from 'react';
import './App.scss';
import { Redirect, Route } from 'react-router-dom';
import FormikLoginForm from './components/LoginForm';
import PrivateRoute from './components/PrivateRoute';
import JokesList from './components/JokesList';

export interface User {
  username: string;
  password: string;
}

const App: React.FC = (): React.ReactElement => {
  return (
    <div className="App">
      <Route
        path="/login"
        render={(props): React.ReactElement =>
          localStorage.getItem('token') ? (
            <Redirect to="/" />
          ) : (
            <FormikLoginForm {...props} />
          )
        }
      />
      <PrivateRoute path="/" exact component={JokesList} />
    </div>
  );
};

export default App;
