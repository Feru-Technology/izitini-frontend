import axios from 'axios'

interface ServerResponse {
    data: ServerData
}

interface ServerData {
    foo: string
    bar: number
}

const baseUrl = 'http://localhost:3002'

const Axios: any = {}

Axios.instance = axios

export default Axios.instance
