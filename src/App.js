import React, { Component } from 'react';
import logo from './logo.svg';
import phish from './cancel.png';
import notPhish from './checked.png';
import './App.css';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {url: '', phish: null}

    this.checkPhish = this.checkPhish.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  checkPhish(event) {
    let config = {
      crossdomain: true
    }

    let data = {
      'url': this.state.url
    }

    axios.post("https://fierce-shore-92315.herokuapp.com/", data, config)
    .then(res => {
          console.log(res);
          this.setState({phish: res.data});
    }).catch(err => alert(err));
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({url: event.target.value});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to isPhish</h1>
        </header>

        <p className="App-intro">
          Paste your suspected phish and click "Find"
        </p>
        <div className="Url-search-box">
          <Form inline onSubmit={this.checkPhish}>
            <FormGroup>
              <Input name="phishUrl" id="phishUrl" placeholder="put your url here!" onChange={this.handleChange}/>
            </FormGroup>
            <Button color="primary" className="Url-button">Find</Button>
          </Form>
        </div>
        <div className='result-frame'>
          <p>{this.state.phish === null ? '' : (this.state.phish ? 'A phish url! (unsafe)' : 'Not a phish url! (safe)')} </p>
          <img src={this.state.phish === null ? '' : (this.state.phish ? phish : notPhish)} />
        </div>
      </div>
    );
  }
}

export default App;
