import React, { Component } from 'react';
import LeftSideBar from './LeftSideBar';
import CenterMain from './CenterMain';

class Main extends Component {
  render () {
    return (
      <div className='main'>
        <LeftSideBar />
      </div>
    )
  }
}

export default Main;