import axios from "axios";

const BASE_URL = 'https://api.github.com/search/repositories?'

const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Authorization': 'Bearer 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',
        'X-GitHub-Api-Version': '2022-11-28'
    }
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