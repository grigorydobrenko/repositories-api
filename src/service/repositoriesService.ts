import axios from "axios";

const BASE_URL = 'https://api.github.com/search/repositories?'
// const BASE_URL = 'https://api.github.com/search/repositories?q=subject'

const instance = axios.create({
    baseURL: BASE_URL,
})

export const repositoriesService = {
    getRepositories: async (param: unknown) => {
        let params = {
            q: 'form-filling-service',
            per_page: '10',
            page: '1'
        }
        const {data} = await instance.get('',{params})
        console.log(data)
        return data
    }
}