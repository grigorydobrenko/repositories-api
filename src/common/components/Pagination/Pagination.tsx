import React from 'react';
import ReactPaginate, {ReactPaginateProps} from "react-paginate";
import {useAppSelector} from "../../hooks/useAppSelector";
import styles from './Pagination.module.scss'
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {fetchRepositories} from "../../../store/reducers/repositoriesReducer";

const Pagination = () => {

    const totalCount = useAppSelector(state => state.repositories.total_count)
    const perPage = useAppSelector(state => state.repositories.per_page)
    const searchValue = useAppSelector(state => state.repositories.searchValue)
    const page = useAppSelector(state => state.repositories.page)

    const pageCount = Math.ceil(totalCount/+perPage)

    const dispacth = useAppDispatch()

    const setCurrentPage = (event: any) => {
        const selected = event.selected + 1
        localStorage.setItem('currentPage', selected)
        dispacth(fetchRepositories({q: searchValue, page: selected, per_page: '10'}))
    }

    return (
        <ReactPaginate
            className={searchValue.length < 3 ? `${styles.root_disabled} ${styles.root}` : styles.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={setCurrentPage}
            pageRangeDisplayed={7}
            marginPagesDisplayed={1}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
            initialPage={+page - 1}
        />
    );
};

export default Pagination;