import axios from 'axios';
import { serverHost } from '../constants';

const ax = axios.create({
    baseURL: serverHost,
});

export default ax;
