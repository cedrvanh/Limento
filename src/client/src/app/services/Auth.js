import axios from 'axios'; 

class Auth {
    static URL = '/api/v1';

    static login = async (body) => {
        let url = `${this.URL}/login/local`;

        const response = await axios.post(url, body);
        return await response.data;
    }

    static logout = async () => {
        localStorage.clear();
    }

    static setToken = (token) => {
        localStorage.setItem('access_token', token);
    }

    static getToken = () => {
        return localStorage.getItem('access_token');
    }

    static isAuthenticated = () => {
        return localStorage.getItem('access_token') !== null;
    } 
}

export default Auth;
