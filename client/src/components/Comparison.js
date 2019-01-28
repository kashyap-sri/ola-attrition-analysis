import React, {Component} from 'react';
import { Line } from 'react-chartjs-2';
import Header from './Header';
import Sentiment from 'sentiment';
import Footer from './Footer';
const _ = require('lodash');
const moment = require('moment');

class Comparison extends Component {

    constructor(props){
        super(props);
        this.state = {
            'chartData': {},
            'olasummary': [],
            'ubersummary': [],
            'showpositives': true
        }
    }

    updateSentiments = (res) => {
        const sentiment = new Sentiment();
        let formattedRes = res.map((item) => {
            return {
                "date": moment(item.date).format('MMM-YYYY'),
                "formattedDate": moment(item.date).format('YYYY-MM-DD').split('-'),
                "summary": item.summary.replace(/"/g, ""),
                "sentiment": sentiment.analyze(item.summary).score
            }
        });
        formattedRes = formattedRes.sort(function(a, b) {
            return new Date(a.date[0], a.date[1], a.date[2]) - new Date(b.date[0], b.date[1], b.date[2])
        })
        formattedRes = formattedRes.filter((item) => item.formattedDate[0] >= 2018);
        return formattedRes;
    }

    getSummary = async (company) => {
        const response = await fetch(`/getSummary?company=${encodeURIComponent(company)}`);
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body;
    }

    classifyReviews = (reviews, company) => {
        const classified = {
            positive: reviews.filter(item => item.sentiment >= 0),
            negative: reviews.filter(item => item.sentiment < 0)
        }
        let binValuesNegative = {};
        let binValuesPositive = {};
        _.forEach(classified.positive, (item) => {
            if(binValuesPositive[item.date] === undefined) {
                binValuesPositive[item.date] = 0;
            } else {
                binValuesPositive[item.date] ++;
            } 
        })
        _.forEach(classified.negative, (item) => {
            if(binValuesNegative[item.date] === undefined) {
                binValuesNegative[item.date] = 0;
            } else {
                binValuesNegative[item.date] ++;
            } 
        })
        const stateObj = _.cloneDeep(this.state);
        const key = company === 'uber' ? "uberbins" : "olabins"
        stateObj[key] = {
            positive: binValuesPositive,
            negative: binValuesNegative
        }
        this.setState(stateObj);
    }

    componentDidMount(){
        this.getSummary().then((res) => {
            const formattedRes = this.updateSentiments(res);
            const classified = this.classifyReviews(formattedRes, 'ola');
            this.setState({ "olasummary": classified });
        });
        this.getSummary("uber").then((res) => {
            const formattedRes = this.updateSentiments(res);
            const classified = this.classifyReviews(formattedRes, 'uber');
            this.setState({ "ubersummary": classified });
        });
    }

    getChartData = () => {
        const chartData = {
            "Ola" : {
                "positives": {
                    "labels": Object.keys(this.state.olabins.positive),
                    "values": Object.values(this.state.olabins.positive)
                },
                "negatives": {
                    "labels": Object.keys(this.state.olabins.negative),
                    "values": Object.values(this.state.olabins.negative)
                }
            },
            "Uber": {
                "positives": {
                    "labels": Object.keys(this.state.uberbins.positive),
                    "values": Object.values(this.state.uberbins.positive)
                },
                "negatives": {
                    "labels": Object.keys(this.state.uberbins.negative),
                    "values": Object.values(this.state.uberbins.negative)
                }
            }
        }; 
        return chartData;
    }

    updateDisplayMode = (value) => {
        this.setState({
            ...this.state,
            "showpositives": value
        })
    }

    render() {
        if(!_.isEmpty(this.state.uberbins) && !_.isEmpty(this.state.olabins)) {
            const chartData = this.getChartData();
            return (
                <div>
                    <Header data="Ola Vs Uber"/>
                    <span className={this.state.showpositives ? "toggle_reviews_mode__pos selected" : "toggle_reviews_mode__pos"}
                        onClick={(e) => this.updateDisplayMode(true)}>
                        Positives
                            </span>
                    <span className="toggle_reviews_mode" onClick={(e) => this.updateDisplayMode(false)}
                        className={!this.state.showpositives ? "toggle_reviews_mode__neg selected" : "toggle_reviews_mode__neg"}>
                        Negatives
                            </span>
                    {this.state.showpositives && 
                    <div className="comparison__chart">
                        <Line
                            data={
                                {
                                    labels: chartData.Ola.positives.labels,
                                    datasets: [
                                        {
                                            label: 'Ola Positives',
                                            data: chartData.Ola.positives.values,
                                            backgroundColor: 'rgba(102, 255, 255,0.2)',
                                            borderColor: 'rgba(54, 162, 235, 0.6)'
                                        },
                                        {
                                            label: 'Uber Positives',
                                            data: chartData.Uber.positives.values,
                                            backgroundColor: 'rgba(255, 255, 153, 0.2)',
                                            borderColor: 'rgba(255, 206, 86, 0.6)'
                                        }
                                    ]
                                }
                            }
                            options={{
                                title: {
                                    display: true,
                                    text: 'Positive reviews count',
                                    fontSize: 25
                                }
                            }}
                        />
                    </div>}
                    {!this.state.showpositives && 
                    <div className="comparison__chart">
                        <Line
                            data={
                                {
                                    labels: chartData.Ola.negatives.labels,
                                    datasets: [
                                        {
                                            label: 'Ola Negatives',
                                            data: chartData.Ola.negatives.values,
                                            backgroundColor: 'rgba(135, 143, 77, 1)',
                                            borderColor: 'rgba(212, 231, 70, 1)'
                                        },
                                        {
                                            label: 'Uber Negatives',
                                            data: chartData.Uber.negatives.values,
                                            fill: 'rgba(212, 231, 70, 1)',
                                            strokeColor: 'rgba(255, 206, 86, 0.6)'
                                        }
                                    ]
                                }
                            }
                            options={{
                                title: {
                                    display: true,
                                    text: 'Negative reviews count',
                                    fontSize: 25
                                }
                            }}
                        />
                    </div>
                    }
                    <Footer back="/summaryUber" front="/endpage"/>
                </div>
            );
        } else {
            return (
                <div>
                    <p>Loading...</p>
                </div>
            );
        }
    }
}

export default Comparison;