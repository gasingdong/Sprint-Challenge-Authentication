import React, { useState } from 'react';
import './App.scss';

export interface User {
  name: string;
  email: string;
  password: string;
  role: string;
}

const App: React.FC = (): React.ReactElement => {
  // const [users, setUsers] = useState<User[]>([]);
  // console.log('Users: ', users);
  return (
    <div className="App">
      {/* <FormikLoginForm users={users} setUsers={setUsers} />
      {users.map(
        (user): React.ReactElement => (
          <UserCard user={user} key={user.email} />
        )
      )} */}
    </div>
  );
};

export default App;
