import React, { Component } from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import image from '../images/ola2.png';
import Footer from './Footer';

class CoverPage extends Component {
    render() {
        return (
            <div>
                <Header/>
                <span>
                    <img className="cab__image" src={image}/>
                </span>
                <Footer front="/summaryOla"/>
            </div>
        );
    }
}

export default CoverPage;