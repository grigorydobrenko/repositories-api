import React, {useEffect} from 'react';
import SearchBar from "../../common/components/SearchBar/SearchBar";
import styles from './MainPage.module.scss'
import List from "../../common/components/List/List";
import {fetchRepositories} from "../../store/reducers/repositoriesReducer";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";
import {useAppSelector} from "../../common/hooks/useAppSelector";
import Loader from "../../common/components/Loader/Loader";

const MainPage = () => {

    const dispatch = useAppDispatch()
    const {searchValue, page, per_page} = useAppSelector(state => state.repositories)
    const {isLoading, isInitialized} = useAppSelector(state => state.app)

    useEffect(() => {
        if (!isInitialized) {
            dispatch(fetchRepositories({q: searchValue, page, per_page}))
        }
    }, [])

    return (
        <div>
            <header className={styles.header}>
                <SearchBar/>
            </header>
            <main className={styles.main}>
                {isLoading ? <Loader/> : <List/>  }
            </main>
        </div>
    );
};

export default MainPage;