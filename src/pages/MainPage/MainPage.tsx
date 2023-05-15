import React, {useEffect} from 'react';
import SearchBar from "../../common/components/SearchBar/SearchBar";
import styles from './MainPage.module.scss'
import {useAppDispatch} from "../../store/hooks";
import {fetchRepositories} from "../../store/reducers/repositoriesReducer";
import List from "../../common/components/List";

const MainPage = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchRepositories())
    }, [])

    return (
        <div>
            <header className={styles.header}>
                <SearchBar/>
            </header>
            <main className={styles.main}>
                <List/>
            </main>
        </div>
    );
};

export default MainPage;