import React, {Component} from 'react';
import WordFrequency from './WordFrequency';
import '../App.css';
const Sentiment = require('sentiment');

class Pros extends Component {
    constructor(props) {
        console.log(props)
        super(props);
        this.state = {
            pros: []
        };
    }

    componentWillReceiveProps(nextprops) {
        if(nextprops.data && nextprops.data.length) {
            const sentiment = new Sentiment();
            const proSentiments = [];
            nextprops.data.forEach((pro) => {
                proSentiments.push({
                    pro,
                    sentiment: sentiment.analyze(pro)
                })
            });
            const sortedPros = proSentiments.sort((a, b) => a.sentiment.score - b.sentiment.score)
                                .map(item => item.pro);
            this.setState({"pros" : sortedPros});
        }
    }

    shouldComponentUpdate(nextprops) {
        return (nextprops.data && nextprops.data.length) ? true : false;
    }

    getProsList = () => {
        let prosList = this.state.pros.splice(0, 10);
        prosList = prosList.map(
            (pro, index) => (<li className="summary__list__item" key={index}>{pro}</li>)
        );
        return prosList;
    }
          
    render() {
        if (this.state.pros.length) {
            return (
                <div>
                    <h3 className="header__pros__cons">Ola's strongest Pros</h3>
                    <div className="summary__list__container">
                        <ul>
                            {this.getProsList()}
                        </ul>
                    </div>
                    <WordFrequency type="pros_frequency"/>
                </div>
            );
        } else {
            return <p>Loading...</p>
        }
    }
  }
      
  export default Pros;