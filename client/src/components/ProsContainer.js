import React, { Component } from 'react';
import '../App.css';
import ProScores from './Pros';
import Header from './Header';
import Footer from './Footer';

class ProsContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: ''
    }
  }

  componentDidMount() {
    if(!localStorage.getItem("pros")) {
      this.getProScores()
      .then((res) => {
        this.setState({
          data: res.map(item => item.pro)
        })
        localStorage.setItem("pros", JSON.stringify(res));
      });
    }  else {
      const cons = JSON.parse(localStorage.getItem("pros"));
      this.setState({
        data: cons.map(item => item.pro)
      })
    }
  }

  getProScores = async () => {
    const response = await fetch('/getProScores');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  render() {
    return (
      <div className="App">
        <Header />
        <ProScores data={this.state.data} />
        <Footer front="/cons" back="/summaryOla" />
      </div>
    );
  }
}

export default ProsContainer;
