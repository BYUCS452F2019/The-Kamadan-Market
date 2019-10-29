import React from 'react';
import LoginPage from './LoginPage';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      user: null
    }

    this.setUser = this.setUser.bind(this);
  }

  setUser(user) {
    this.setState({user})
  }

  render() {
    return (
      <div className="app">
        <LoginPage setUser={this.setUser} />
      </div>
    );
  }
}

export default App;
