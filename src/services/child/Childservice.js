import axios from 'axios';
import axiosConfig from '@/assets/js/index';

const apiClient = axios.create(
    axiosConfig
);


export default {

    async find(id) {
        apiClient.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('token') + '';
        try {
            const response = await apiClient.get("/users/" + id + "?context=edit");
            return response.data;
        } catch (error) {
            return error.response.data
        }
    },
}