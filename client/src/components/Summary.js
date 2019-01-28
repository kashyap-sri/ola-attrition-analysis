import React, { Component } from 'react';
import Header from './Header';
import { Pie } from 'react-chartjs-2';
import Sentiment from 'sentiment';
import '../App.css';
import Footer from './Footer';
const _ = require('lodash');

class Summary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            summary: '',
            displayPos: true
        }
    }

    componentDidMount() {
        this.getSummary().then((res) => {
            const formattedRes = this.updateSentiments(res);
            localStorage.setItem("summary", JSON.stringify(formattedRes));
            this.setState({ "summary": formattedRes });
        });
    }

    updateSentiments = (res) => {
        const sentiment = new Sentiment();
        let formattedRes = res.map((item) => {
            return {
                ...item,
                "summary": item.summary.replace(/"/g, ""),
                "sentiment": sentiment.analyze(item.summary).score
            }
        });
        formattedRes = formattedRes.sort((a, b) => a.sentiment > b.sentiment ? -1 : 1);
        return formattedRes;
    }

    getSummary = async () => {
        const response = await fetch(`/getSummary?company=${encodeURIComponent(this.props.company)}`);
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body;
    }

    getPieChartData = () => {
        const labels = ['Positive', 'Negative', 'Neutral'];
        const values = [
            this.state.summary.filter(item => item.sentiment > 0).length,
            this.state.summary.filter(item => item.sentiment < 0).length,
            this.state.summary.filter(item => item.sentiment == 0).length
        ];
        return {
            labels,
            values
        }
    }

    updateDisplayMode = (value) => this.setState({"displayPos": value});

    getReviewListToDisplay = () => {
        let reviewList = _.cloneDeep(this.state);
        reviewList = this.state.displayPos ? reviewList.summary.splice(10, 10) : reviewList.summary.splice(-10);   
        return reviewList.map((item, index) => <li className="summary__list__item" key={index}>{item.summary}</li>)
    }

    render() {
        if (this.state.summary) {
            const chartData = this.getPieChartData();
            return (
                <div>
                    <div>
                        <Header data={`${!this.props.company ? 'Ola\'s' : 'Uber\'s'} Summary`} />
                        <div>
                            <span className={this.state.displayPos ? "toggle_reviews_mode__pos selected" : "toggle_reviews_mode__pos"} 
                            onClick={(e) => this.updateDisplayMode(true)}>
                                Positives
                            </span>
                            <span className="toggle_reviews_mode" onClick={(e) => this.updateDisplayMode(false)}
                            className={!this.state.displayPos ? "toggle_reviews_mode__neg selected" : "toggle_reviews_mode__neg"}>
                                Negatives
                            </span>
                        </div>
                        <div className="summary__list__container">
                            <ul>
                                {this.getReviewListToDisplay()}
                            </ul>
                        </div>
                    </div>
                    <div className="summary__pie">
                        <span class="total__reviews__container">Total Reviews: {this.state.summary.length}</span>
                        <Pie
                            data={
                                {
                                    labels: chartData.labels,
                                    datasets: [
                                        {
                                            label: 'Pros',
                                            data: chartData.values,
                                            backgroundColor: [
                                                'rgba(255, 99, 132, 0.6)',
                                                'rgba(54, 162, 235, 0.6)',
                                                'rgba(255, 206, 86, 0.6)',
                                            ]
                                        }
                                    ]
                                }
                            }
                            options={{
                                title: {
                                    display: this.props.displayTitle,
                                    text: 'Review Analysis',
                                    fontSize: 25
                                }
                            }}
                        />
                    </div>
                    <Footer back={this.props.company ? '/cons' : '/'} front={this.props.company ? '/comparison' : "/pros"}/>
                </div>
            );
        } else {
            return <p>Loading...</p>
        }
    }
}

export default Summary;