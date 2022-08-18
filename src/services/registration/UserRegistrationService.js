import axios from 'axios';

const apiClient = axios.create({
    baseURL: `http://christophe-desmarres-server.eddi.cloud/wp-json`,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    timeout: 10000
});

export default {
    async register(params) {
        try {
            const response = await apiClient.post('/wp/v2/users/register', params);
            return response.data
        } catch (errors) {
            return errors.response.data
        }
    },
}