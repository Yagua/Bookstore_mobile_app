import axios from 'axios'

import {API_BASE_URL, TH_BOOKS_API_BASE_URL} from '../../constants'

class LibraryService {
    getAllCategories(accessToken) {
        return axios.get(API_BASE_URL + "/categories/", {
            headers: {
                "Authorization": `JWT ${accessToken}`
            }
        }).then(response => response.data)
    }

    getBooksByCategoryId(accessToken, categoryId) {
        return axios.get(API_BASE_URL + `/categories/${categoryId}/books/`, {
            headers: {
                "Authorization": `JWT ${accessToken}`
            }
        }).then(response => response.data)
    }

    // # third-party api
    getUpcomingBooks() {
        return axios.get(TH_BOOKS_API_BASE_URL + "/new")
            .then(response => response.data)
    }
}

export default new LibraryService()
