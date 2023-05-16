import axios, {AxiosRequestConfig} from "axios";

const BASE_URL = 'https://api.github.com/search/repositories?'

const instance = axios.create({
    baseURL: BASE_URL,
})

export const repositoriesService = {
    getRepositories: async (params: ParamsType) => {
        const {data} = await instance.get('', {params})
        return data
    }
}

type ParamsType = {
    q: string,
    per_page?: string,
    page?: string,
}