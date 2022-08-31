import axios from 'axios';
import axiosConfig from '@/assets/js/index';

const apiClient = axios.create(
    axiosConfig
);

export default {
    async registerChild(params) {
        apiClient.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('token') + '';
        try {
            const response = await apiClient.post('/wp/v2/child', params);
            return response.data
        } catch (errors) {
            return errors.response.data
        }
    },

    async findChild(id) {
        apiClient.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('token') + '';
        try {
            const response = await apiClient.get("/wp/v2/child/" + id);
            return response.data;
        } catch (error) {
            return error.response.data
        }
    },
}