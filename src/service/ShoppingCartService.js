import axios from 'axios'

import {API_BASE_URL} from '../../constants'

class ShoppingCartService {

    addItemToCart(accessToken, item) {
        return axios.post(API_BASE_URL + "/carts/add-item/", item, {
            headers: {
                "Authorization": `JWT ${accessToken}`
            }
        }).then(response => response.data)
    }

    deleteItemFromCart(accessToken, itemId) {
        return axios.delete(API_BASE_URL + `/carts/remove-item/${itemId}/`, {
            headers: {
                "Authorization": `JWT ${accessToken}`
            }
        }).then(response => response.data)
    }

    getShoppingCart(accessToken) {
        return axios.get(API_BASE_URL + "/carts/user-cart/", {
            headers: {
                "Authorization": `JWT ${accessToken}`
            }
        }).then(response => response.data)
    }

}

export default new ShoppingCartService()
