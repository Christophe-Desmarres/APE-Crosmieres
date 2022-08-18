import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://christophe-desmarres-server.eddi.cloud/wp-json/wp/v2',
    headers: {
        Accept: 'application/json'
    },
    timeout: 10000
});

export default {
    // Get the list of all the sales with their metadata
    async findAll() {
        try {
            const response = await apiClient.get('/sale?_embed');
            return response.data;
        } catch (error) {
            return error.response.data
        }
    },
    // Get the list of all the events with their metadata
    async findImage() {
        try {
            const response = await apiClient.get('/sale');
            return response.data;
        } catch (error) {
            return error.response.data
        }
    },
    // Get an sale by his id
    async find(id) {
        apiClient.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('token') + '';
        try {
            const response = await apiClient.get("/sale/" + id + "?_embed");
            return response.data;
        } catch (error) {
            return error.response.data
        }

    },
    async findMeta(id) {
        try {
            const response = await apiClient.get("/sale/meta/" + id + "");
            return response.data;
        } catch (error) {
            return error.response.data
        }

    },
    async update(params) {
        try {
            apiClient.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('token') + '';
            const response = await apiClient.post("/sale/"+ params.id+ "", params);
            return response.data;
        } catch(error) {
            return error.response.data
        }        
    },
    //CUSTOM UPDATE WITH META TO 
    async updateCustom(params) {
        try {
            apiClient.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('token') + '';
            const response = await apiClient.post("/sale/update/"+ params.id+ "", params);
            return response.data;
        } catch(error) {
            return error.response.data
        }        
    },
    async create(params) {
        try {
            apiClient.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('token') + '';           
            const response = await apiClient.post("/sale", params);
            return response.data;
        } catch(error) {
            return error.response.data
        }        
    },
    async delete(params) {
        try {
            apiClient.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('token') + '';
            const response = await apiClient.delete("/sale/"+ params.id+ "");
            return response.data;
        } catch(error) {
            return error.response.data
        }  
    },      

    // Get meta value by sale's id
    async getMeta(id) {

        try {
            const meta = await apiClient.get('/sale/meta/'+ id +'');
            return meta.data
        } catch(error) {
            return error.response.data
        } 
    },

    // to upload a file
    upload(file, title, postId) {

        apiClient.defaults.headers.common['Content-Type'] = "multipart/form-data";
        apiClient.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('token') + '';

        let formData = new FormData();
        formData.append("title", 'sale-' + title);
        formData.append("file", file);
        formData.append("post", postId);

        return apiClient.post("/media", formData);
    },

    // to verify if files to upload exist
    getFiles() {
        return apiClient.get("/media");
    },


    // create an sale
    async addSale(param) {
        apiClient.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('token') + '';
        apiClient.defaults.headers.common['Content-Type'] = "application/json";

        try {
            const response = await apiClient.post('/sale', param);
            return response
        } catch (errors) {
            return errors.response
        }
    },


    // to link media feature to an event
    async addMediaToSale(postId, mediaId) {

        apiClient.defaults.headers.common['Content-Type'] = "image/*";
        apiClient.defaults.headers.common['Content-Disposition'] = "attachment";

        try {
            const response = await apiClient.post('/sale/' + postId, {
                featured_media: mediaId
            });
            return response
        } catch (errors) {
            return errors.response
        }
    }
}
