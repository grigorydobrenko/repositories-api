import React from 'react';
import ReactPaginate from "react-paginate";
import {useAppSelector} from "../../hooks/useAppSelector";
import styles from './Pagination.module.scss'

const Pagination = () => {

    const totalCount = useAppSelector(state => state.repositories.total_count)
    const perPage = useAppSelector(state => state.repositories.per_page)

    const pageCount = Math.ceil(totalCount/+perPage)

    console.log(pageCount)

    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            // onPageChange={(event) => setCurrentPage(event.selected + 1)}
            pageRangeDisplayed={7}
            marginPagesDisplayed={1}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    );
};

export default Pagination;