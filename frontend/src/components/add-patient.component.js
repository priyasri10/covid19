import React, { Component } from "react";
import PatientDataService from "../services/patient.service";

export default class AddPatient extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onChangeBprate = this.onChangeBprate.bind(this);
    this.savePatient = this.savePatient.bind(this);
    this.newPatient = this.newPatient.bind(this);

    this.state = {
      id: null,
      name: "",
      age: "",
      bprate: ""
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeAge(e) {
    this.setState({
      age: e.target.value
    });
  }

  onChangeBprate(e) {
    this.setState({
      bprate: e.target.value
    });
  }

  savePatient() {
    var data = {
      name: this.state.name,
      age: this.state.age,
      bprate: this.state.bprate
    };

   PatientDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          age: response.data.age,
          bprate: response.data.email,

          submitted: true

        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newPatient() {
    this.setState({
      id: null,
      name: "",
      age: "",
      bprate: "",

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newPatient}>
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

            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input
                type="text"
                className="form-control"
                id="age"
                required
                value={this.state.age}
                onChange={this.onChangeAge}
                name="age"
              />
            </div>

            <div className="form-group">
              <label htmlFor="bprate">Bprate</label>
              <input
                  type="text"
                  className="form-control"
                  id="bprate"
                  required
                  value={this.state.bprate}
                  onChange={this.onChangeBprate}
                  name="bprate"
              />
            </div>


            <button onClick={this.savePatient} className="btn btn-success">
              Submit
            </button>
          </div>
       )
        }
      </div>
    );
  }
}
