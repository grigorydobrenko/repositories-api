import {createSlice} from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: 'app',
    initialState: {
        isLoading: null as boolean | null,
        isInitialized: false as boolean | null
    },
    reducers: {
        setIsLoading(state, action) {
            state.isLoading = action.payload
        },
        setIsInitialized(state, action) {
            state.isInitialized = action.payload
        },
    },
})

export const appReducer = appSlice.reducer

export const {setIsLoading, setIsInitialized} = appSlice.actions