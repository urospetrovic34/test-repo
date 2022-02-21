import React, {useState} from 'react'
import './Card.css'
import {useSelector} from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'
import { useMutation } from "react-query";
import axiosConfig from "../../../config/axiosConfig";
import {Modal} from '../Modal/Modal'
import useGuestAnswers from "../../../hooks/answers/useGuestAnswers";

export const Card = (props) => {

    const newDate = new Date(props.date)
    const user = useSelector((state) => state.user)
    const [modalCheck,setModalCheck] = useState(false)
    const answers = useGuestAnswers(props.id)

    function getOrdinal(n) {
        return n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
    }

    const ordinalDate = getOrdinal(newDate.toLocaleString('default', { day: 'numeric' }))
    const pendingLink = `/team/pending/${props.id}/edit`
    const editUserLink = `/team/${props.id}/edit`

    const handleDelete = (event) => {
        event.preventDefault();
        mutationDelete.mutate();
      };
    
      const handleModal = (event) => {
        event.preventDefault();
        modalCheck ? setModalCheck(false) : setModalCheck(true)
      }

    const mutationDelete = useMutation(() => {
        return axiosConfig.delete(`/profiles/${props.id}`);
    },{
        onSuccess: () => {
          alert("User is now deleted")
          window.location.reload();
        },
      });

    return (
        <span onClick={handleModal}>
        {modalCheck && answers.status === 'success' && <Modal profile={props.profile} answers={answers}/>}
        <span>
            <img className="card-avatar" src={props.img} alt={props.alt}/>
            <div className="card-row-one">
                <div className="card-row-one-col-one">
                    <div className="card-name">{props.name}</div>
                    <div className="card-date">Joined {newDate.toLocaleString('default', { month: 'short' })} {ordinalDate},  {newDate.getFullYear()}</div>
                </div>
                <div className="card-row-one-col-two">
                    {user.user && (<p className="card-status">{props.status.charAt(0).toUpperCase() + props.status.slice(1)}</p>)}
                </div>
            </div>
                {
                    user.user && user.type==="companyAdmin" && (
                        <div className="card-row-two">
                            <div className="card-row-two-col-one">
                                
                                {
                                    props.pageType === "pending" ? (
                                        <Link state={{ profile: props.profile }} to={pendingLink}><button>Details</button></Link>
                                    ) : props.pageType === "published" && (
                                        <Link state={{ profile: props.profile }} to={editUserLink}><button>Edit</button></Link>
                                    )
                                }
                            </div>
                            <div className="card-row-two-col-two">
                                <button onClick={handleDelete}><FontAwesomeIcon icon={ faTrash }/></button>
                            </div>
                        </div>
                    )
                }
        </span>
        </span>
    )
}
