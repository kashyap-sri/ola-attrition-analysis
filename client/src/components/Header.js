import React, {Component} from 'react';
import '../App.css'

class Header extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="header__container">
                <span>
                    <h2>{this.props.data || 'Ola Attrtion analysis'}</h2>
                </span>
            </div>
        );
    }
}

export default Header;