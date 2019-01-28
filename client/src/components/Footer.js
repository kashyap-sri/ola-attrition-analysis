import React from 'react';
import { Link } from 'react-router-dom';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa'

export default (props) => {
    return (
        <div>
            {props.back && 
            <Link to={props.back}>
                <span className="navigate__left__icon">
                    <FaAngleLeft/>
                </span>
            </Link>}
            {props.front && 
            <Link to={props.front}>
                <span className="navigate__right__icon">
                    <FaAngleRight/>
                </span>
            </Link>}
        </div>
    );
}