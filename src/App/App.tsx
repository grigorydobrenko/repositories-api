import React from 'react';
import styles from './App.module.scss'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage";
import CardPage from "../pages/CardPage/CardPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage/>,
    },
    {
        path: ":id",
        element: <CardPage/>,
    },

]);

function App() {

    return (
        <div className={styles.appContainer}>
            <RouterProvider router={router}/>
        </div>
    );
}

export default App;
