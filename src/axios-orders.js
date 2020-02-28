import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-70ffa.firebaseio.com/'
});

export default instance;