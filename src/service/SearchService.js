import axios from 'axios'

import {API_BASE_URL} from '../../constants'

class SearchService {
    performSearch(accessToken, searchTerm) {
        return axios.get(API_BASE_URL + `/search/books/?query=${searchTerm}`, {
            headers: {
                "Authorization": `JWT ${accessToken}`
            }
        }).then(response => response.data)
    }
}

export default new SearchService()
