import axios, { AxiosInstance } from 'axios';

export default (): AxiosInstance => {
  const token = localStorage.getItem('token');
  return axios.create({
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
  });
};
