import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Nav from './Nav';
import Main from './Main';


class App extends Component {
  render() {
    return (
      <div className='container'>
        <Nav />
        <div className="main-body-container">
          <Route path="/" component={Main} />
        </div>
      </div>
    );
  }
}

export default App;
