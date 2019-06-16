import axios from 'axios';
import Geocode from 'react-geocode';

Geocode.setApiKey('AIzaSyA0-40zOgbZZPssJJORf6velwkC7fBC_YQ');

const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

const getLatLngFromAddress = (address) => {
    console.log('Getting latlng');
    Geocode.fromAddress("Eiffel Tower")
        .then(res => {
            console.log(res);
        }).catch(err => console.log(err));
}

const filterNullFromObj = (obj) => {
    for (let key in obj) {
        if (obj[key] === null) {
            delete obj[key];
        }
    }

    return obj;
}

export { setAuthToken, getLatLngFromAddress, filterNullFromObj };