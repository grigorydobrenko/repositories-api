import React, {useState} from 'react';
import ReactPaginate from "react-paginate";
import {useAppSelector} from "../../hooks/useAppSelector";
import styles from './Pagination.module.scss'
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {fetchRepositories, setCurrentPage, setPerPage} from "../../../store/reducers/repositoriesReducer";

const Paginator:React.FC<PaginationType> = ({pageCountOptions}) => {

    const [visibility, setVisibility] = useState<boolean>(false)

    const totalCount = useAppSelector(state => state.repositories.total_count)
    const perPage = useAppSelector(state => state.repositories.per_page)
    const searchValue = useAppSelector(state => state.repositories.searchValue)
    const page = useAppSelector(state => state.repositories.page)

    const paginationTotalCount = totalCount < 1000 ? totalCount : 999

    const pageCount = Math.ceil(paginationTotalCount / +perPage)

    const dispatch = useAppDispatch()

    const pageCountHandler = () => {
        setVisibility(!visibility)
    }

    const onPageCountChanged = (el: string) => {
        localStorage.setItem('PerPage', el)
        localStorage.setItem('currentPage', '1')

        dispatch(setPerPage(el))
        dispatch(setCurrentPage('1'))
        dispatch(fetchRepositories({q: searchValue, page: '1', per_page: el}))
    }

    const onPageChange = (event: any) => {
        const selected = event.selected + 1
        localStorage.setItem('currentPage', selected)
        dispatch(setCurrentPage(selected))
        dispatch(fetchRepositories({q: searchValue, page: selected, per_page: perPage}))
    }

    return (
        <div className={styles.paginator_box}>
            <div className={styles.page_count_box}>
                <div
                    className={styles.page_count}
                    onClick={pageCountHandler}
                >
                    {perPage} &dArr;
                </div>
                {visibility &&
                    <div className={styles.page_count_options}>
                        {pageCountOptions.map((el, index) => {
                            const onClickHandler = () => {
                                onPageCountChanged(el)
                                setVisibility(false)
                            }
                            return <div
                                key={index}
                                className={styles.el}
                                onClick={onClickHandler}
                            >
                                {el}
                            </div>
                        })}
                    </div>
                }
            </div>
            <ReactPaginate
                className={searchValue.length < 3 ? `${styles.root_disabled} ${styles.root}` : styles.root}
                breakLabel="..."
                nextLabel=">"
                onPageChange={onPageChange}
                pageRangeDisplayed={7}
                marginPagesDisplayed={1}
                pageCount={pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
                initialPage={+page - 1}
                forcePage={+page - 1}
            />
        </div>
    );
};

export default Paginator;

type PaginationType = {
    pageCountOptions: string[]
}