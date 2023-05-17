import React, {ChangeEvent, useState} from 'react';
import styles from './SearchBar.module.scss'

import {ReactComponent as SearchIcon} from "../../assets/search_icon.svg";
import {fetchRepositories, setSearchValue} from "../../../store/reducers/repositoriesReducer";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useAppSelector} from "../../hooks/useAppSelector";

const SearchBar = () => {
    const searchValue = useAppSelector(state => state.repositories.searchValue)

    const [value, setValue] = useState<string>(searchValue)

    const dispatch = useAppDispatch()

    const {page, per_page} = useAppSelector(state => state.repositories)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    const submitSearch = () => {
        localStorage.setItem('searchValue', value)
        if (value.length >= 3) {
            dispatch(setSearchValue(value))
            dispatch(fetchRepositories({q: value, page, per_page}))
        }
    }

    return (
        <div className={styles.container}>
            <input type="text" value={value} onChange={handleChange}
                   placeholder={'Начните вводить текст для поиска (не менее трех символов)'} className={styles.input}
            />
            <div className={styles.logo} onClick={submitSearch}>
                <SearchIcon/>
            </div>
        </div>
    );
};

export default SearchBar;