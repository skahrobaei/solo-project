import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import CanineWalkTable  from './components/dogs.jsx';
import './stylesheets/styles.css';

class App extends Component {
  render() {
    return (
      <div >
        <CanineWalkTable />
      </div>
    );
  }
}

export default App;