import axios from 'axios'

export interface ServerResponse {
    data: ServerData
}

export interface ServerData {
    foo: string
    bar: number
}

const baseURL = 'http://localhost:3002'

const Axios: any = {}

Axios.instance = axios.create({ baseURL })

export default Axios.instance
