import axios from 'axios';
import decode from 'jwt-decode';

class AuthService {

    // Save user token to localStorage
    setToken(idToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${idToken}`;
        localStorage.setItem('id_token', idToken);
    };

    // Retrieves the user token from localStorage
    getToken() {
        return localStorage.getItem('id_token');
    };

    // Login method: take username and password as parameters
    login = (username, password) => {
        // Get a token
        return axios.post('api/login', { username: username, password: password }).then(res => {
            // Set the token once the user logs in
            this.setToken(res.data.token);
            // Return the rest of the response
            return res;
        });
    };

};

export default AuthService;
