import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import axiosWithAuth from '../utils/axiosWithAuth';

interface Joke {
  id: string;
  joke: string;
}

const JokesList = ({ history }: RouteComponentProps): React.ReactElement => {
  const [jokes, setJokes] = useState([]);

  const getJokes = async (): Promise<void> => {
    try {
      const response = await axiosWithAuth().get(
        'http://localhost:3300/api/jokes'
      );
      console.log(response);
      setJokes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect((): void => {
    getJokes();
  }, []);

  return (
    <div>
      <h1>Jokes</h1>
      {jokes.map(
        (joke: Joke): React.ReactElement => (
          <p key={joke.id}>{joke.joke}</p>
        )
      )}
    </div>
  );
};

export default JokesList;
