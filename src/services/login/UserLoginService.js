import axios from 'axios';
import axiosConfig from '@/assets/js/index';

const apiClient = axios.create(
    axiosConfig
);

export default {
    async login(param) {
        try {
            const response = await apiClient.post('/jwt-auth/v1/token', param);
            return response.data

        } catch (errors) {
            return errors.response.data
        }
    },

    async getRoles(id) {
        try {
            apiClient.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('token') + '';
            const role = await apiClient.get('/wp/v2/users/' + id + '?context=edit');
            return role.data
        } catch (error) {
            return error.response.data
        }
    },

    async find(id) {
        apiClient.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('token') + '';
        try {
            const response = await apiClient.get("/wp/v2/users/" + id + "?context=edit" );
            return response.data;
        } catch (error) {
            return error.response.data
        }
    },
        
    async getMeta(id) {
         apiClient.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('token') + '';
        try {
            const meta = await apiClient.get('/wp/v2/users/meta/'+ id +'');
            return meta.data
        } catch(error) {
            return error.response.data
        } 
    },
    async findAll() {
        apiClient.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('token') + '';
        try {
            const response = await apiClient.get("/wp/v2/users/?context=edit");
            return response.data;
        } catch (error) {
            return error.response.data
        }
    },

    async findAllForMember() {
         apiClient.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('token') + '';
        try {
            const response = await apiClient.get("/wp/v2/user/list");
            return response.data;
        } catch (error) {
            return error.response.data
        }
    },
    }
