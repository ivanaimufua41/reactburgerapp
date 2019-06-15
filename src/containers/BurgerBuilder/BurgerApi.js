const orderURL = "https://burgerapp-react-58cc7.firebaseio.com/ingredients.json";

const burgerAPI = {
    getBurgerOrder: () => {
        return axios.get(orderURL)
            .then(response => response.data)
    },
    postBurgerOrder: (order) => {
        return axios.post("/orders.json", order)
            .then(response => response.data)
    }
}

export default burgerAPI;