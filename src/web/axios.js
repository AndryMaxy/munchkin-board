import axios from 'axios';
import { host } from '../constants';

const ax = axios.create({
    baseURL: host,
});

export default ax;
