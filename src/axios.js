import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-my-burger-c962c.firebaseio.com/'
})

export default instance;