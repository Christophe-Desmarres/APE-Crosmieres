import axios from 'axios';

const apiClient = axios.create({
    baseURL: `http://apecrosmieres.local/wp-json`,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + sessionStorage.getItem('token') + ''
    },
    timeout: 10000
});

export default {
    async registerChild(params) {
        try {
            const response = await apiClient.post('/wp/v2/child', params);
            return response.data
        } catch (errors) {
            return errors.response.data
        }
    },

    async findChild(id) {
        try {
            const response = await apiClient.get("/wp/v2/child/" + id);
            return response.data;
        } catch (error) {
            return error.response.data
        }
    },
}