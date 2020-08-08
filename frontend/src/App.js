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

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/tutorials" className="navbar-brand">
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
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
