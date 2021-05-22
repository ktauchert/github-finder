import React from 'react';
import Navbar from './component/layout/Navbar'
import UserItem from './component/users/UserItem';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar bg-primary">
          <Navbar />
        </nav>
        <UserItem />
      </div>
    );
  }
}

export default App;