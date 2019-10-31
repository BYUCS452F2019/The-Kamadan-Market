import React from 'react';
import LoginPage from './LoginPage';
import MainPage from './MainPage';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      user: {
        userID: 8,
        gamertag: 'dspence',
        firstName: 'Danny',
        lastName: 'Spencer',
        email: 'danny@email.com'
      }
    }

    this.setUser = this.setUser.bind(this);
  }

  setUser(user) {
    this.setState({user})
  }

  render() {
    return (
      <div className="app">
        {this.state.user ?
          <MainPage user={this.state.user} />
          :
          <LoginPage setUser={this.setUser} />
        }
      </div>
    );
  }
}

export default App;
