import axios from './axios';

export default {
    getAll: async () => {
        const response = await axios.get('/player/all');
        return response.data;
    },
};
