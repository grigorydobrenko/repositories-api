import React from 'react';
import styles from "../../pages/MainPage/MainPage.module.scss";
import {CardType} from "../../store/reducers/repositoriesReducer";
import Card from "./Card/Card";
import {useAppSelector} from "../../store/hooks";

const List = () => {

    const repositories = useAppSelector(state => state.repositories.items)

    return (
        <div className={styles.items_container}>{repositories.map((repository: CardType) => {
            return <Card key={repository.id} id={repository.id} project={repository.project}
                         author={repository.author} stars={repository.stars}
                         watchers={repository.watchers} avatar={repository.avatar}
                         projectUrl={repository.projectUrl}
                         ownerUrl={repository.ownerUrl}
            />
        })}</div>
    );
};

export default List;