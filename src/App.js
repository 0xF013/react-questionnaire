import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import QuestionForm from './QuestionForm'

class App extends Component {
  render() {
    return (
      <div className="App">
        <QuestionForm />
      </div>
    );
  }
}

export default App;
