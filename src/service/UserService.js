import axios from "axios";

import {API_BASE_URL} from '../../constants'

class UserService {
    getUserProfile(accessToken) {
        return axios.get(API_BASE_URL + "/profile/user/", {
            headers: {
                "Authorization": `JWT ${accessToken}`
            }
        }).then(response => response.data)
    }

    updateGeneralInfo(accessToken, data) {
        return axios.patch(API_BASE_URL + "/auth/users/me/", data, {
            headers: {
                "Authorization": `JWT ${accessToken}`
            }
        }).then(response => response.data)
    }

    updateContactLocationInfo(accessToken, data) {
        return axios.patch(API_BASE_URL + "/profile/update/", data, {
            headers: {
                "Authorization": `JWT ${accessToken}`
            }
        }).then(response => response.data)
    }

    createNewUser(user) {
        return axios.post(API_BASE_URL + "/auth/users/", user)
            .then(response => response.data)
    }
}

export default new UserService()
