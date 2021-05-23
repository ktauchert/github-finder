import React from 'react';
import Navbar from './component/layout/Navbar'
import Users from './component/users/Users';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  state = {
    users: [],
    loading: false,
  }

  async componentDidMount(){
    this.setState({
      loading: true
    })
    const res = await axios.get('https://api.github.com/users');

    this.setState({
      users: res.data,
      loading: false,
    })
  }
  render() {
    const {
      loading, users
    } = this.state;

    return (
      <div>
        <Navbar />
        <div className="container">
          <Users loading={loading} users={users}/>
        </div>
      </div>
    );
  }
}

export default App;