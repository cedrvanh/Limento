import axios from 'axios';

import Auth from './Auth';
import { setAuthToken } from '../utilities';


const instance = axios.create();
instance.interceptors.request.use(
    (config) => {
        let user = Auth.getToken();

        setAuthToken(user.token);

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);

class Api {
    static URL = '/api/v1';

    static findAllPosts = async (queryParams=null) => {
        let url = `${this.URL}/posts`;
        if (queryParams !== null) {
            url += (url.indexOf('?') === -1 ? '?' : '&') + this.queryParams(queryParams);
        }   
        const response = await instance.get(`${url}`);
        return await response.data;
    }

    static findOnePost = async (id) => {
        let url = `${this.URL}/posts/${id}`;
        const response = await instance.get(`${url}`);
        return await response.data;
    }

    static createPost = async (post) => {
        let url = `${this.URL}/posts`;
        await instance.post(`${url}`, post);
    }

    static findAllPostTypes = async (queryParams=null) => {
        let url = `${this.URL}/types`;
        if (queryParams !== null) {
            url += (url.indexOf('?') === -1 ? '?' : '&') + this.queryParams(queryParams);
        }   
        const response = await instance.get(`${url}`);
        return await response.data;
    }

    static findAllTags = async (queryParams=null) => {
        let url = `${this.URL}/tags`;
        if (queryParams !== null) {
            url += (url.indexOf('?') === -1 ? '?' : '&') + this.queryParams(queryParams);
        }   
        const response = await instance.get(`${url}`);
        return await response.data;
    }

    static findOneUser = async (id) => {
        const response = await instance.get(`${this.URL}/users/${id}`);
        return await response.data;
    }

    static queryParams = (params) => {
        return Object.keys(params)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
            .join('&');
    }
}

export default Api;
