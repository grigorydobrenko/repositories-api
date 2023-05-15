import {configureStore} from "@reduxjs/toolkit";
import {appReducer} from "./reducers/appReducer";
import {repositoriesReducer} from "./reducers/repositoriesReducer";

export const store = configureStore({
    reducer: {
        app: appReducer,
        repositories: repositoriesReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;