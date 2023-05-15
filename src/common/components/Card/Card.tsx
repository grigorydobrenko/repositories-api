import React from 'react';
import {CardType} from "../../../store/reducers/repositoriesReducer";
import styles from './Card.module.scss'
import {ReactComponent as Star} from "../../assets/star.svg";
import {ReactComponent as Eye} from "../../assets/eye.svg";

const Card: React.FC<CardType> = (props) => {

    const {id, project, author, avatar, stars, watchers} = props

    return (
        <div className={styles.container}>
            <h4 className={styles.title}>{project}</h4>
            <div className={styles.author}>
                <img src={avatar} alt="avatar" className={styles.photo}/>
                <div className={styles.name}>{author}</div>
            </div>
            <div className={styles.counts}>
                <div className={styles.type_count}>
                    <Star/>
                    <span className={styles.count}>{stars}</span>
                </div>
                <div className={styles.type_count}>
                    <Eye/>
                    <span className={styles.count}>{watchers}</span>
                </div>
            </div>
            <div>

            </div>
        </div>
    );
};

export default Card;

