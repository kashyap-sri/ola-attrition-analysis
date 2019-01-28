import React, {Component} from 'react';
import Footer from './Footer';
import '../App.css';
import Header from './Header';

class EndPage extends Component {
    render() {
        return (
            <div>
                <div className="end__page__container">
                    <Header data="Thank You!"/>
                </div>
                <div>
                    <Footer back="/comparison"/>
                </div>
            </div>
        );
    }
}

export default EndPage;