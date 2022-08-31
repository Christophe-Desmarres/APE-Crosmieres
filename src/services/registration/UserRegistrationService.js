import axios from 'axios';
import axiosConfig from '@/assets/js/index';

const apiClient = axios.create(
    axiosConfig
);

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