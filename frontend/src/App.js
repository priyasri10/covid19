import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddDoctor from "./components/add-doctor.component";
import AddPatient from "./components/add-patient.component";
import AddUser from "./components/add-user.component";
import Doctor from "./components/doctor.component";
import Patient from "./components/patient.component";
import User from "./components/user.component";
import HomeComponent from "./components/home.component";
import DoctorsList from "./components/doctors-list.component";
import PatientsList from "./components/patient-list.component";
import UsersList from "./components/user-list.component";

import AuthService from "./services/auth.service";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN")
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/users" className="navbar-brand">
              Covid19
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/doctors"} className="nav-link">
                  Doctors
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/patients"} className="nav-link">
                  Patients
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/users"} className="nav-link">
                  Users
                </Link>
              </li>
            </div>
            {showModeratorBoard && (
                <li className="nav-item">
                  <Link to={"/mod"} className="nav-link">
                    Moderator Board
                  </Link>
                </li>
            )}

            {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Admin Board
                  </Link>
                </li>
            )}

            {currentUser && (
                <li className="nav-item">
                  <Link to={"/user"} className="nav-link">
                    User
                  </Link>
                </li>
            )}


        {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
        ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
        )
        }
        </nav>
          <div className="container mt-3">
            <Switch>
              <Route exact path={[ "/"]} component={HomeComponent} />
              <Route exact path={[ "/doctors"]} component={DoctorsList} />
              <Route exact path={[ "/patients"]} component={PatientsList} />
              <Route exact path={[ "/users"]} component={UsersList} />
              <Route exact path={[ "/patients/add"]} component={AddPatient} />
              <Route exact path={[ "/doctors/add"]} component={AddDoctor} />
              <Route path="/doctors/:id" component={Doctor} />
              <Route path="/patients/:id" component={Patient} />
              <Route path="/users/:id" component={User} />
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/user" component={BoardUser} />
              <Route path="/mod" component={BoardModerator} />
              <Route path="/admin" component={BoardAdmin} />
            </Switch>
          </div>
        </div>
    </Router>
    );
  }
}

export default App;
