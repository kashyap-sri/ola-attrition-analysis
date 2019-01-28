import React, {Component} from 'react';
import Header from './Header';
import { Bar } from 'react-chartjs-2';
const _ = require('lodash');

class WordFrequency extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: {}
        }
    }

    componentDidMount() {
        if(!localStorage.getItem(this.props.type)) {
            this.getFrequency(this.props.type)
            .then((response) => {
                const sortable = [];
                for (const review in response) {
                    sortable.push(
                        {
                            word: review,
                            value: response[review]
                        }
                    );
                }
                sortable.sort((a, b) => {
                    return a.value > b.value ? -1 : 1; 
                });
                let stateObj = _.cloneDeep(this.state);
                stateObj[this.props.type] = sortable;
                this.setState(stateObj);
                localStorage.setItem(this.props.type, JSON.stringify(stateObj[this.props.type]));
            })
        } else {
            let stateObj = _.cloneDeep(this.state);
            stateObj[this.props.type] = JSON.parse(localStorage.getItem(this.props.type));
            this.setState(stateObj);
        }
    }

    getFrequency = async (from) => {
        const path = (this.props.type === 'pros_frequency') ? '/getProFrequencies' : '/getConFrequencies';
        const response = await fetch(path);
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body;
    }

    getChartData = (key) => {
        const stateObj = _.cloneDeep(this.state);
        const frequencies = stateObj[this.props.type].splice(0, 25);
        if(frequencies) {
            return {
                labels: frequencies.map(item => item.word),
                values: frequencies.map(item => item.value) 
            }
        }
    }

    render(){
        console.log(this.props.type);
        if(this.state[this.props.type]) {
            const chartData = this.getChartData(this.props.type);
            return (
                <div>
                    <div class="frequency__graph__container">
                        <Bar
                            data={
                                {
                                    labels: chartData.labels,
                                    datasets: [
                                        {
                                            label: this.props.type === 'pros_frequency' ? 'Pros' : 'Cons',
                                            data: chartData.values,
                                            backgroundColor: [
                                                'rgba(255, 99, 132, 0.6)',
                                                'rgba(54, 162, 235, 0.6)',
                                                'rgba(255, 206, 86, 0.6)',
                                                'rgba(75, 192, 192, 0.6)',
                                                'rgba(153, 102, 255, 0.6)',
                                                'rgba(255, 159, 64, 0.6)',
                                                'rgba(255, 99, 132, 0.6)'
                                            ]
                                        }
                                    ]
                                }
                            }
                            options={{
                                title: {
                                    display: true,
                                    text: `Most frequent ${this.props.type === 'pros_frequency' ? 'positive' : 'negative'} words in Reviews`,
                                    fontSize: 25
                                }
                            }}
                        />
                    </div>
                </div>
            );
        } else {
            return <p>Loading...</p>
        }
    }
}

export default WordFrequency;