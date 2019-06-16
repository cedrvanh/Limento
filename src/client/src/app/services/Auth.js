import axios from 'axios'; 

class Auth {
    static URL = '/api/v1';

    static login = async (body) => {
        let url = `${this.URL}/login/local`;

        const response = await axios.post(url, body);
        return await response.data;
    }

    static register = async (user) => {
        let url = `${this.URL}/register`;
        const response = await axios.post(`${url}`, user);
        return await response.data;
    }

    static logout = () => {
        localStorage.clear();
    }

    static setToken = (user) => {
        localStorage.setItem('user', JSON.stringify({ 
            uid: user.uid, 
            token: user.token 
        }));
    }

    static getToken = () => {
        return JSON.parse(localStorage.getItem('user'));
    }

    static isAuthenticated = () => {
        return JSON.parse(localStorage.getItem('user')) !== null;
    } 

    static getCurrentUID = () => {
        const { uid } = this.getToken();
        return uid;
    }

    static getCurrentUser = async () => {
        const uid = this.getCurrentUID();
        
        let url = `${this.URL}/users/${uid}`;

        const response = await axios.get(url);
        return await response.data;
    }

}

export default Auth;
