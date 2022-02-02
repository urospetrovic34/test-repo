import React from 'react'
import './Card.css'
import {useSelector} from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash,faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'

export const Card = (props) => {

    const newDate = new Date(props.date)
    const user = useSelector((state) => state.user)

    function getOrdinal(n) {
        return n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
    }

    const ordinalDate = getOrdinal(newDate.toLocaleString('default', { day: 'numeric' }))

    return (
        <div className="card">
            <img src={props.img} alt={props.alt}/>
            <div className="card-row-one">
                <div className="card-row-one-col-one">
                    <div className="card-name">{props.name}</div>
                    <div className="card-date">Joined {newDate.toLocaleString('default', { month: 'short' })} {ordinalDate},  {newDate.getFullYear()}</div>
                </div>
                <div className="card-row-one-col-two">
                    <p className="card-status">{props.status.charAt(0).toUpperCase() + props.status.slice(1)}</p>
                </div>
            </div>
                {
                    user.user && user.type==="companyAdmin" && (
                        <div className="card-row-two">
                            <div className="card-row-two-col-one">
                                {
                                    props.pageType === "pending" ? (
                                        <Link to="/"><button><FontAwesomeIcon icon={ faPencilAlt }/></button></Link>
                                    ) : props.pageType === "published" && (
                                        <Link to="/"><button>ABC</button></Link>
                                    )
                                }
                            </div>
                            <div className="card-row-two-col-two">
                                <button><FontAwesomeIcon icon={ faTrash }/></button>
                            </div>
                        </div>
                    )
                }
        </div>
    )
}
