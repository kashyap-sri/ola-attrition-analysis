import React, {Component} from 'react';
import WordFrequency from './WordFrequency';
const Sentiment = require('sentiment');

class Cons extends Component {
    constructor(props) {
        console.log(props)
        super(props);
        this.state = {
            cons: []
        };
    }

    componentWillReceiveProps(nextprops) {
        if(nextprops.data && nextprops.data.length) {
            const sentiment = new Sentiment();
            const conSentiments = [];
            nextprops.data.forEach((con) => {
                conSentiments.push({
                    con,
                    sentiment: sentiment.analyze(con)
                })
            });
            const sortedCons = conSentiments.sort((a, b) => a.sentiment.score - b.sentiment.score)
                                .map(item => item.con);
            this.setState({"cons" : sortedCons});
        }
    }

    shouldComponentUpdate(nextprops) {
        return (nextprops.data && nextprops.data.length) ? true : false;
    }

    getConsList = () => {
        let consList = this.state.cons.splice(0, 10);
        consList = consList.map(
            (con, index) => (<li className="summary__list__item" key={index}>{con}</li>)
        );
        return consList;
    }
          
    render() {
        if (this.state.cons.length) {
            return (
                <div>
                    <h3 className="header__pros__cons">Ola's strongest Cons</h3>
                    <div className="summary__list__container">
                        <ul>
                            {this.getConsList()}
                        </ul>
                    </div>
                    <WordFrequency type="cons_frequency"/>
                </div>
            );
        } else {
            return <p>Loading...</p>
        }
    }
  }
      
  export default Cons;