import React from 'react';
import styles from './SearchBar.module.scss'

import {ReactComponent as SearchIcon} from "../../assets/search_icon.svg";

const SearchBar = () => {
    return (
        <div className={styles.container}>
            <input type="text" placeholder={'Начните вводить текст для поиска (не менее трех символов)'} className={styles.input}
                  />
            <div className={styles.logo}>
                <SearchIcon />
            </div>
        </div>
    );
};

export default SearchBar;