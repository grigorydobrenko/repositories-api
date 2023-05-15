import React from 'react';
import styles from './App.module.scss'
import {Route, Routes} from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage";
import CardPage from "../pages/CardPage/CardPage";

function App() {

    return (
        <div className={styles.appContainer}>
            <Routes>
                <Route path={'/'} element={<MainPage/>}/>
                <Route path={':id'} element={<CardPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
