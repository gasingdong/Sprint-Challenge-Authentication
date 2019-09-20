import React from 'react';
import './App.scss';
import FormikLoginForm from './components/LoginForm';

export interface User {
  username: string;
  password: string;
}

const App: React.FC = (): React.ReactElement => {
  return (
    <div className="App">
      <FormikLoginForm />
    </div>
  );
};

export default App;
