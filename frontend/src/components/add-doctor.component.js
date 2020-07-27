import React, { Component } from "react";
import DoctorDataService from "../services/doctor.service";

export default class AddDoctor extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.saveDoctor = this.saveDoctor.bind(this);
    this.newDoctor = this.newDoctor.bind(this);

    this.state = {
      id: null,
      name: ""
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  saveDoctor() {
    var data = {
      name: this.state.name
    };

   DoctorDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newDoctor() {
    this.setState({
      id: null,
      name: ""
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newDoctor}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <button onClick={this.saveDoctor} className="btn btn-success">
              Submit
            </button>
          </div>
       )
        }
      </div>
    );
  }
}
