import React from 'react';
import './App.scss';
import Login from '../Pages/Login/Login';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h2>INSIDE APP COMPONENT</h2>
        <button className="btn btn-info">I am a button</button>
        <Login></Login>
      </div>
    );
  }
}

export default App;
