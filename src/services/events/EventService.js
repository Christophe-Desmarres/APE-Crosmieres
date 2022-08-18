import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://christophe-desmarres-server.eddi.cloud/wp-json/wp/v2',
    headers: {
        Accept: 'application/json',
        // Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9hcGVjcm9zbWllcmVzLmxvY2FsIiwiaWF0IjoxNjU4NzYyNTkzLCJuYmYiOjE2NTg3NjI1OTMsImV4cCI6MTY1OTM2NzM5MywiZGF0YSI6eyJ1c2VyIjp7ImlkIjoxLCJkZXZpY2UiOiIiLCJwYXNzIjoiYmZhNmRhYTVlNTRjNGY3MzU4ZDNhMGI3YTQ4Y2RkNmYifX19.0KrEEAZCD16AjhdMkjs6m_z1-2X5uEE8QD05W6rTNZc'


    },
    timeout: 10000

})

export default {
    // Get the list of all the events with their metadata
    async findAll() {
        try {
            const response = await apiClient.get('/event?_embed');
            return response.data;
        } catch (error) {
            return error.response.data
        }
    },
    // Get an event by his id
    async find(id) {
        apiClient.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('token') + '';
        try {
            const response = await apiClient.get("/event/" + id + "?_embed");

            return response.data;
        } catch (error) {
            return error.response.data
        }
    },

    // Get meta value by event's id
    async getMeta(id) {

        try {
            const meta = await apiClient.get('/event/meta/' + id + '');
            return meta.data
        } catch (error) {
            return error.response.data
        }
    },

    // to upload a file
    upload(file, title, postId) {

        apiClient.defaults.headers.common['Content-Type'] = "multipart/form-data";
        apiClient.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('token') + '';

        let formData = new FormData();

        formData.append("title", 'event-' + title);
        formData.append("file", file);
        formData.append("post", postId);

        // send file to wordpress media and return image info
        return apiClient.post("/media", formData);
    },

    // to verify if files to upload exist
    getFiles() {
        return apiClient.get("/media");
    },


    // create an event
    async addEvent(param) {
        apiClient.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('token') + '';
        apiClient.defaults.headers.common['Content-Type'] = "application/json";

        try {
            const response = await apiClient.post('/event', param);
            return response
        } catch (errors) {
            return errors.response
        }
    },


    // to link media feature to an event
    async addMediaToEvent(postId, mediaId) {

        apiClient.defaults.headers.common['Content-Type'] = "image/*";
        apiClient.defaults.headers.common['Content-Disposition'] = "attachment";

        try {
            const response = await apiClient.post('/event/' + postId, {
                featured_media: mediaId
            });
            return response
        } catch (errors) {
            return errors.response
        }
    },

    // to view an event
    async readEvent(postId, param) {
        apiClient.defaults.headers.common['Content-Type'] = "application/json";
        try {
            const response = await apiClient.post('/event/' + postId, param);
            return response
        } catch (errors) {
            return errors.response
        }
    },
    async findMeta(id) {
        apiClient.defaults.headers.common['Content-Type'] = "application/json";
        try {
            const response = await apiClient.get("/event/meta/" + id + "");

            return response.data;
        } catch (error) {
            return error.response.data
        }

    },
    async create(params) {
        try {
            apiClient.defaults.headers.common['Content-Type'] = "application/json";

            apiClient.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('token') + '';
            const response = await apiClient.post("/event", params);

            return response.data;
        } catch (error) {
            return error.response.data
        }
    },
    async update(params) {
        try {
            apiClient.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('token') + '';
            const response = await apiClient.post("/event/" + params.id + "", params);
            return response.data;
        } catch (error) {
            return error.response.data
        }
    },
    //CUSTOM UPDATE WITH META TO 
    async updateCustom(params) {
        try {
            apiClient.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('token') + '';
            const response = await apiClient.post("/event/update/" + params.id + "", params);
            return response.data;
        } catch (error) {
            return error.response.data
        }
    },
    async delete(params) {
        try {
            apiClient.defaults.headers.common['Content-Type'] = "application/json";
            apiClient.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('token') + '';
            const response = await apiClient.delete("/event/" + params.id + "");
            return response.data;
        } catch (error) {
            return error.response.data
        }
    },
}