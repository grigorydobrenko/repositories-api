import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {repositoriesService} from "../../service/repositoriesService";
import {setIsInitialized, setIsLoading} from "./appReducer";

export const fetchRepositories = createAsyncThunk(
    'repositories/fetchRepositories',
    async (param: { q: string, page: string, per_page: string}, thunkAPI) => {
        thunkAPI.dispatch(setIsLoading(true))
        const data = await repositoriesService.getRepositories(param)
        thunkAPI.dispatch(setIsInitialized(true))
        thunkAPI.dispatch(setIsLoading(false))
        return data
    }
)

const storageSearchValue = localStorage.getItem('searchValue')
const storagePage = localStorage.getItem('currentPage')
const storagePerPage = localStorage.getItem('perPage')

const initialState = {
    items: [] as CardType[],
    rawItems: [],
    incomplete_results: null,
    total_count: 60,
    page: storagePage ?? '1',
    per_page: storagePerPage ?? '10',
    searchValue: storageSearchValue ?? 'repositories',
    changedRepositories: [] as ChangedRepository[]
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
        addChangeRepository: (state, action) => {
            state.changedRepositories.push(action.payload)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRepositories.fulfilled, (state, action) => {

            state.rawItems = action.payload.items

            const filteredItems = state.rawItems.filter((repository: any) => {
                const changedIndex = state.changedRepositories.findIndex((changedRepository) => changedRepository.id === repository.id);

                if (changedIndex === -1) {
                    return repository;
                }
            })

            const mappedItems = filteredItems.map((repository: any) => {
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

export const {setSearchValue, setCurrentPage, setPerPage, addChangeRepository} = repositoriesSlice.actions

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

type ChangedRepository = {
    id: string,
    project?: string,
    author?: string,
    description?: string
}