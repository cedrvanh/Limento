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
            console.log(`URL with Params: ${url}`);
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

    static updatePost = async (id, updatedPost) => {
        let url = `${this.URL}/posts/${id}`;
        await instance.put(url, updatedPost);
    }

    static deletePost = async (id) => {
        let url = `${this.URL}/posts/${id}`;
        await instance.delete(url);
    }

    static findAllCategories = async (queryParams=null) => {
        let url = `${this.URL}/categories`;
        if (queryParams !== null) {
            url += (url.indexOf('?') === -1 ? '?' : '&') + this.queryParams(queryParams);
        }   
        const response = await instance.get(`${url}`);
        return await response.data;
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

    static createComment = async (comment) => {
        let url = `${this.URL}/comments`;
        const response = await instance.post(`${url}`, comment);
        return await response.data;
    }

    static findOneUser = async (id) => {
        const response = await instance.get(`${this.URL}/users/${id}`);
        return await response.data;
    }

    static createUser = async (user) => {
        let url = `${this.URL}/users`;
        const response = await axios.post(`${url}`, user);
        return await response.data;
    }

    static updateUser = async (id, updatedUser) => {
        let url = `${this.URL}/users/${id}`;
        await instance.put(url, updatedUser);
    }

    static findAllConversations = async (queryParams=null) => {
        let url = `${this.URL}/conversations`;
        if (queryParams !== null) {
            url += (url.indexOf('?') === -1 ? '?' : '&') + this.queryParams(queryParams);
        }   
        const response = await instance.get(`${url}`);
        return await response.data;
    }

    static findOneConversation = async (id) => {
        const response = await instance.get(`${this.URL}/conversations/${id}`);
        return await response.data;
    }

    static createConversation = async (conversation) => {
        let url = `${this.URL}/conversations`;
        const response = await instance.post(`${url}`, conversation);
        return await response.data;
    }


    static updateConversation = async (id, updatedConversation) => {
        let url = `${this.URL}/conversations/${id}`;
        await instance.put(url, updatedConversation);
    }

    static findAllMessages = async (queryParams=null) => {
        let url = `${this.URL}/messages`;
        if (queryParams !== null) {
            url += (url.indexOf('?') === -1 ? '?' : '&') + this.queryParams(queryParams);
        }   
        const response = await instance.get(`${url}`);
        return await response.data;
    }

    static createMessage = async (message) => {
        let url = `${this.URL}/messages`;
        const response = await instance.post(`${url}`, message);
        return await response.data;
    }

    static queryParams = (params) => {
        return Object.keys(params)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
            .join('&');
    }
}

export default Api;
