import React from 'react';
import Navbar from './component/layout/Navbar'
import Alert from './component/layout/Alert'
import Users from './component/users/Users';
import Search from './component/users/Search';
import axios from 'axios';
import './App.css';


class App extends React.Component {
  state = {
    users: [],
    loading: false,
    alert: null
  }

  // async componentDidMount() {
  //   this.setState({
  //     loading: true
  //   })
  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

  //   this.setState({
  //     users: res.data,
  //     loading: false,
  //   })
  // }

  // search Github users
  searchUsers = async text => {
    this.setState({ loading: true })
    console.log(text);
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({
      users: res.data.items,
      loading: false,
    })
  }
  clearUsers = () => this.setState({ users: [], loading: false })

  setAlert = (message, type) => {
    this.setState({
      alert: {
        message, type
      }
    });
    setTimeout(() => {
      this.setState({
        alert: null
      })
    }, 5000);
  }

  render() {
    const {
      loading, users, alert
    } = this.state;

    return (
      <div>
        <Navbar />
        <div className="container">
          <Alert alert={alert} />
          <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} showClear={users.length > 0} setAlert={this.setAlert} />
          <Users loading={loading} users={users} />
        </div>
      </div>
    );
  }
}

export default App;