import React, {ChangeEvent, useEffect, useState} from 'react';
import styles from './SearchBar.module.scss'

import {ReactComponent as SearchIcon} from "../../assets/search_icon.svg";
import useDebounce from "../../hooks/useDebounce";
import {fetchRepositories} from "../../../store/reducers/repositoriesReducer";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useAppSelector} from "../../hooks/useAppSelector";

const SearchBar = () => {
    const [value, setValue] = useState<string>('')
    const debouncedValue = useDebounce<string>(value, 500)

    const dispatch = useAppDispatch()

    const {page, per_page} = useAppSelector(state => state.repositories)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    useEffect(() => {
        if (value.length >= 3) {
            dispatch(fetchRepositories({q: value, page, per_page}))
        }
    }, [debouncedValue])

    return (
        <div className={styles.container}>
            <input type="text" value={value} onChange={handleChange}
                   placeholder={'Начните вводить текст для поиска (не менее трех символов)'} className={styles.input}
            />
            <div className={styles.logo}>
                <SearchIcon/>
            </div>
        </div>
    );
};

export default SearchBar;