import React from 'react';
import {CardType} from "../../../store/reducers/repositoriesReducer";
import styles from './Card.module.scss'
import {ReactComponent as Star} from "../../assets/star.svg";
import {ReactComponent as Eye} from "../../assets/eye.svg";
import {Link} from "react-router-dom";

const Card: React.FC<CardType> = (props) => {

    const {id, project, author, avatar, stars, watchers, projectUrl, ownerUrl} = props

    return (
        <div className={styles.container}>
            <a href={projectUrl} className={styles.title}>{project}</a>
            <div className={styles.author}>
                <img src={avatar} alt="avatar" className={styles.photo}/>
                <a href={ownerUrl} className={styles.name}>{author}</a>
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
            <div >
                <Link to={`${id}`} className={styles.button}>
                    Подробнее
                </Link>
            </div>
        </div>
    );
};

export default Card;

