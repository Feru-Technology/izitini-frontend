import axios from 'axios'

const baseURL = 'http://142.93.224.218:4000/'

const Axios = axios.create({ baseURL })

export default Axios
