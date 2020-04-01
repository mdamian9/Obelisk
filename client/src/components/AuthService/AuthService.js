import axios from 'axios';
import decode from 'jwt-decode';

class AuthService {

    // Save user token to localStorage
    setToken = idToken => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${idToken}`;
        localStorage.setItem('id_token', idToken);
    };

    // Retrieves the user token from localStorage
    getToken = () => {
        return localStorage.getItem('id_token');
    };

    // Login method: take username and password as parameters
    login = (username, password) => {
        // Get a token using axios post request to /login
        return axios.post('/login', { username: username, password: password }).then(res => {
            // Set the token once the user logs in
            this.setToken(res.data.token);
            // Return the rest of the response
            return res;
        });
    };

    // Decode token to get profile
    getProfile = () => {
        return decode(this.getToken());
    };

    // Checks if token is expired
    isTokenExpired = token => {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else
                return false;
        } catch (err) {
            return false;
        };
    };

    // Checks if there is a saved token and it's still valid
    loggedIn = () => {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token) // handwaiving here
    };

    // Clear user token and profile data from localStorage
    logout = () => {
        axios.defaults.headers.common['Authorization'] = null;
        localStorage.removeItem('id_token');
    };

};

export default AuthService;
