import axios from 'axios'

const baseURL = 'http://localhost:3002/'

const Axios = axios.create({ baseURL })

export default Axios
