import React, { Component } from 'react';
import LandingPage from './components/LandingPage/LandingPage';

class App extends Component {
  render = () => {
    return (
      <LandingPage history={this.props.history} />
    );
  };
};

export default App;
