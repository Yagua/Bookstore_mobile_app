import axios from 'axios'
import {API_BASE_URL} from '../../constants'

const AUTH_BASE_URL = API_BASE_URL + "/auth"

class AuthService {
    login(username, password) {
        return axios.post(AUTH_BASE_URL + "/login/", {
            username: username,
            password: password
        }).then(response => response.data)
    }

    refresh_tokens(refresh_token) {
        return axios.post(AUTH_BASE_URL + "/jwt/refresh/", {
            refresh: refresh_token
        }).then(response => response.data)
    }
}

export default new AuthService()


