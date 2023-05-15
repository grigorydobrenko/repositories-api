import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {repositoriesService} from "../../service/repositoriesService";

export const fetchRepositories = createAsyncThunk(
    'repositories/fetchRepositories',
    async (_, thunkAPI) => {
        const data = await repositoriesService.getRepositories({f: ''})
        console.log(data)
        return data
    }
)

const repositoriesSlice = createSlice({
    name: 'repositories',
    initialState: {
        items: [],
        incomplete_results: null,
        total_count: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchRepositories.fulfilled, (state, action) => {
            const mappedItems = action.payload.items.map((repository: any) => {
                return {
                    id: repository.id,
                    project: repository.name,
                    author: repository.owner.login,
                    avatar: repository.owner.avatar_url,
                    stars: repository.stargazers_count,
                    watchers: repository.stargazers_count
                }
            })
            state.items = mappedItems
            state.incomplete_results = action.payload.incomplete_results
            state.total_count = action.payload.total_count
        })
    },
})

export const repositoriesReducer = repositoriesSlice.reducer

export type CardType = {
    id: string,
    project: string,
    author: string,
    avatar: string,
    stars: string,
    watchers: string
}