import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {repositoriesService} from "../../service/repositoriesService";


export const fetchRepositories = createAsyncThunk(
    'repositories/fetchRepositories',
    async (param: { q: string, page: string, per_page: string }, thunkAPI) => {
        const data = await repositoriesService.getRepositories(param)
        console.log(data.items)
        return data
    }
)

const storageSearchValue = localStorage.getItem('searchValue')
const storagePage = localStorage.getItem('currentPage')
const storagePerPage = localStorage.getItem('perPage')

const initialState = {
    items: [],
    incomplete_results: null,
    total_count: 60,
    page: storagePage ?? '1',
    per_page: storagePerPage ?? '10',
    searchValue: storageSearchValue ?? ''
}

const repositoriesSlice = createSlice({
    name: 'repositories',
    initialState,
    reducers: {
        setSearchValue: (state, action) => {
            state.searchValue = action.payload
        },
        setCurrentPage: (state, action) => {
            state.page = action.payload
        },
        setPerPage: (state, action) => {
            state.per_page = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRepositories.fulfilled, (state, action) => {
            const mappedItems = action.payload.items.map((repository: any) => {
                return {
                    id: repository.id,
                    project: repository.name,
                    author: repository.owner.login,
                    avatar: repository.owner.avatar_url,
                    stars: repository.stargazers_count,
                    watchers: repository.stargazers_count,
                    projectUrl: repository.html_url,
                    ownerUrl: repository.owner.html_url,
                    description: repository.description
                } as CardType
            })
            state.items = mappedItems
            state.incomplete_results = action.payload.incomplete_results
            state.total_count = action.payload.total_count
        })
    },
})

export const repositoriesReducer = repositoriesSlice.reducer

export const {setSearchValue, setCurrentPage, setPerPage} = repositoriesSlice.actions

export type CardType = {
    id: string,
    project: string,
    author: string,
    avatar: string,
    stars: string,
    watchers: string,
    projectUrl: string,
    ownerUrl: string,
    description: string,
}