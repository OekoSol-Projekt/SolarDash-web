import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080', // Gateway API base URL
});

export default instance;
