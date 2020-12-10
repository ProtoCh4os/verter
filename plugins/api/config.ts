import Axios from 'axios';

export const instance = Axios.create({
  baseURL: `http://localhost:3000/api`,
});

export default { instance };
