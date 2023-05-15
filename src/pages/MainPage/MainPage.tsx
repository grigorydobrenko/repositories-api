import React, {useEffect} from 'react';
import SearchBar from "../../common/components/SearchBar/SearchBar";
import styles from './MainPage.module.scss'
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {CardType, fetchRepositories} from "../../store/reducers/repositoriesReducer";
import Card from "../../common/components/Card/Card";

const MainPage = () => {

    const dispatch = useAppDispatch()

    const repositories = useAppSelector(state => state.repositories.items)

    useEffect(() => {
        dispatch(fetchRepositories())
    }, [])

    return (
        <div>
            <header className={styles.header}>
                <SearchBar/>
            </header>
            <main className={styles.main}>
                <div className={styles.items_container}>{repositories.map((repository: CardType) => {
                    return <Card key={repository.id} id={repository.id} project={repository.project}
                                 author={repository.author} stars={repository.stars}
                                 watchers={repository.watchers} avatar={repository.avatar}/>
                })}</div>
            </main>
        </div>
    );
};

export default MainPage;