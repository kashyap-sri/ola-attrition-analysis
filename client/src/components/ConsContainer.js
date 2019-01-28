import React, { Component } from 'react';
import '../App.css';
import ConScores from './Cons';
import Header from './Header';
import Footer from './Footer';

class ConsContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: ''
    }
  }

  componentDidMount() {
    if(!localStorage.getItem("cons")) {
      this.getConScores()
      .then((res) => {
        this.setState({
          data: res.map(item => item.con)
        })
        localStorage.setItem("cons", JSON.stringify(res));
      });
    } else {
      const cons = JSON.parse(localStorage.getItem("cons"));
      this.setState({
        data: cons.map(item => item.con)
      })
    }
  }

  getConScores = async () => {
    const response = await fetch('/getConScores');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  render() {
    return (
      <div className="App">
          <Header/>
          <ConScores data={this.state.data}/>
          <Footer back="/pros" front="/summaryUber"/>
      </div>
    );
  }
}

export default ConsContainer;
