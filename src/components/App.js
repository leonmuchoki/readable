import React, { Component } from 'react';
import Nav from './Nav';
import Main from './Main';


class App extends Component {
  render() {
    return (
      <div className='container'>
        <Nav />
        <div className="main-body-container">
          <Main />
        </div>
      </div>
    );
  }
}

export default App;
