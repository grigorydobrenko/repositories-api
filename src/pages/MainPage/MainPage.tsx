import React, {useEffect} from 'react';
import SearchBar from "../../common/components/SearchBar/SearchBar";
import styles from './MainPage.module.scss'
import List from "../../common/components/List/List";
import {fetchRepositories} from "../../store/reducers/repositoriesReducer";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";
import {useAppSelector} from "../../common/hooks/useAppSelector";

const MainPage = () => {

    const dispatch = useAppDispatch()
    const {searchValue, page, per_page} = useAppSelector(state => state.repositories)

    useEffect(() => {
        dispatch(fetchRepositories({q: searchValue ?? 'repositories-api', page, per_page}))
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