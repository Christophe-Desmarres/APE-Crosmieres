import axios from 'axios';
import axiosConfig from '@/assets/js/index';

const apiClient = axios.create(
    axiosConfig
);

export default {

    async delete() {
        apiClient.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('token') + '';

        try {
            const response = await apiClient.delete('/wp/v2/user', {
                "force": true,
                "reassign": 1
            });
            return response.data;
        } catch (error) {
            return error.response.data
        }
    },

    async deleteById(id) {
        apiClient.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('token') + '';

        try {
            const response = await apiClient.delete('/wp/v2/users/' + id + '?reassign=1&force=true');
            return response.data;
        } catch (error) {
            return error.response.data
        }
    },

    async update(id, params) {
        apiClient.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('token') + '';

        try {
            const response = await apiClient.post('/wp/v2/users/' + id, params);
            return response.data
        } catch (errors) {
            return errors.response.data
        }
    },

    async updatePhone(id, params) {
        apiClient.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('token') + '';

        try {
            const response = await apiClient.put('/wp/v2/users/meta/' + id, params);
            return response.data
        } catch (errors) {
            return errors.response.data
        }
    },
    // to send email for event registration
    async sendEmail(params) {
        apiClient.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('token') + '';

        apiClient.defaults.headers.common['Content-Type'] = "text/html";

        try {
            const response = await apiClient.post('/wp/v2/send', params);
            return response
        } catch (errors) {
            return errors.response
        }
    },

}