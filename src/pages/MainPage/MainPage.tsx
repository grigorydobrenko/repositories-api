import React from 'react';
import SearchBar from "../../common/components/SearchBar/SearchBar";
import styles from './MainPage.module.scss'

const MainPage = () => {
    return (
        <div>
            <header className={styles.header}>
                <SearchBar/>
            </header>
            <main>

            </main>
        </div>
    );
};

export default MainPage;