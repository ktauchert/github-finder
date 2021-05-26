import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./component/layout/Navbar";
import Alert from "./component/layout/Alert";
import Users from "./component/users/Users";
import User from "./component/users/User";
import Search from "./component/users/Search";
import axios from "axios";
import "./App.css";
import About from "./component/pages/About";

class App extends React.Component {
    state = {
        users: [],
        user: {},
        loading: false,
        alert: null,
    };

    // search Github users
    searchUsers = async (text) => {
        this.setState({ loading: true });
        const res = await axios.get(
            `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );

        this.setState({
            users: res.data.items,
            loading: false,
        });
    };
    // get single github user
    getUser = async (username) => {
        this.setState({ loading: true });
        const res = await axios.get(
            `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );

        this.setState({
            user: res.data,
            loading: false,
        });
    };
    clearUsers = () => this.setState({ users: [], loading: false });

    setAlert = (message, type) => {
        this.setState({
            alert: {
                message,
                type,
            },
        });
        setTimeout(() => {
            this.setState({
                alert: null,
            });
        }, 5000);
    };

    render() {
        const { loading, users, user, alert } = this.state;

        return (
            <Router>
                <div>
                    <Navbar />
                    <div className="container">
                        <Alert alert={alert} />
                        <Switch>
                            <Route
                                exact
                                path="/"
                                render={(props) => (
                                    <Fragment>
                                        <Search
                                            searchUsers={this.searchUsers}
                                            clearUsers={this.clearUsers}
                                            showClear={users.length > 0}
                                            setAlert={this.setAlert}
                                        />
                                        <Users
                                            loading={loading}
                                            users={users}
                                        />
                                    </Fragment>
                                )}
                            />
                            <Route exact path="/about" render={About} />
                            <Route
                                exact
                                path="/user/:login"
                                render={(props) => (
                                    <User
                                        {...props}
                                        getUser={this.getUser}
                                        user={user}
                                        loading={loading}
                                    />
                                )}
                            />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
