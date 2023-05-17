import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import styles from './CardPage.module.scss';
import {ReactComponent as Delete} from "../../common/assets/cross.svg";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";
import {addChangeRepository} from "../../store/reducers/repositoriesReducer";

const CardPage = () => {
        const location = useLocation();

        const locationData = location.state;

        const [project, setProject] = useState(locationData.project)
        const [author, setAuthor] = useState(locationData.author)
        const [description, setDescription] = useState(locationData.description)

        const [isProjectEdit, setIsProjectEdit] = useState(false)
        const [isAuthorEdit, setIsAuthorEdit] = useState(false)
        const [isDescriptionEdit, setIsDescriptionEdit] = useState(false)
        const [isDeleted, setIsDeleted] = useState(false)

        const navigate = useNavigate();

        const dispatch = useAppDispatch()

        const activateProjectEdit = () => {
            setIsProjectEdit(!isProjectEdit)
        }
        const activateAuthorEdit = () => {
            setIsAuthorEdit(!isAuthorEdit)
        }
        const activateDescriptionEdit = () => {
            setIsDescriptionEdit(!isDescriptionEdit)
        }

        const deleteEntity = () => {
            const {id} = locationData
            const deletedRepository = {id}

            dispatch(addChangeRepository(deletedRepository))
            setIsDeleted(true)

        }

        useEffect(() => {
            if (isDeleted) {
                navigate("../");
            }
        }, [isDeleted, navigate]);

        return (
            <div className={styles.container}>
                <div className={styles.btn_container}>
                    <button className={styles.btn} onClick={deleteEntity}><Delete/></button>
                </div>
                {isProjectEdit ?
                    <input type={'text'} value={project} onChange={event => setProject(event.currentTarget.value)}
                           onBlur={activateProjectEdit} autoFocus/> :
                    <div onDoubleClick={() => setIsProjectEdit(prevState => !prevState)}>{project}</div>}
                {isAuthorEdit ?
                    <input type={'text'} value={author} onChange={event => setAuthor(event.currentTarget.value)}
                           onBlur={activateAuthorEdit} autoFocus/> :
                    <div onDoubleClick={() => setIsAuthorEdit(prevState => !prevState)}>{author}</div>}
                {isDescriptionEdit ?
                    <input type={'text'} value={description} onChange={event => setDescription(event.currentTarget.value)}
                           onBlur={activateDescriptionEdit} autoFocus/> :
                    <div onDoubleClick={() => setIsDescriptionEdit(prevState => !prevState)}>{description}</div>}
            </div>
        );
    }
;

export default CardPage;