import React from 'react';
import {CardType} from "../../../store/reducers/repositoriesReducer";
import Card from "../Card/Card";
import {useAppSelector} from "../../hooks/useAppSelector";
import Pagination from "../Pagination/Pagination";
import styles from "./List.module.scss"

const List = () => {

    const repositories = useAppSelector(state => state.repositories.items)

    return (
        <div>
            <Pagination pageCountOptions={['10', '25', '50']}/>
            <div className={styles.items_container}>

                {repositories.map((repository: CardType) => {
                    return <Card key={repository.id} id={repository.id} project={repository.project}
                                 author={repository.author} stars={repository.stars}
                                 watchers={repository.watchers} avatar={repository.avatar}
                                 projectUrl={repository.projectUrl}
                                 ownerUrl={repository.ownerUrl}
                    />
                })}</div>
        </div>
    );
};

export default List;