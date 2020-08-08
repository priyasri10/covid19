import React, { Component } from "react";
import PatientDataService from "../services/patient.service";
import AutoCompleteComponent from "./auto-complete.component";
import DoctorDataService from "../services/doctor.service";
import Search from "react-search";

export default class AddPatient extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onChangeBprate = this.onChangeBprate.bind(this);
    this.onChangeDoctorId = this.onChangeDoctorId.bind(this);
    this.savePatient = this.savePatient.bind(this);
    this.newPatient = this.newPatient.bind(this);


    this.state = {
      id: null,
      name: "",
      age: "",
      bprate: "",
      doctor_id: 0,
      doctors: []
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
    onChangeDoctorId(e) {
    debugger;
        this.setState({
            // doctor_id: e.target
        });
    }

  //  =================================== S
  getItemsAsync(searchValue, cb) {
    // let url = `https://api.github.com/search/repositories?q=${searchValue}&language=javascript`
    let url = `http://localhost:8080/api/doctors?title=${searchValue}&page=0&size=100`

    fetch(url).then( (response) => {
      return response.json();
    }).then((results) => {
      if(results.doctors != undefined){
        let items = results.doctors.map( (res, i) => { return { id: res.id, value: res.name } })
        this.setState({ doctors: items })
        cb(searchValue)
      }
    });
  }
  //  =================================== E
  savePatient() {
    var data = {
      name: this.state.name,
      age: this.state.age,
      bprate: this.state.bprate,
      doctor_id: this.state.doctor_id
    };

   PatientDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          age: response.data.age,
          bprate: response.data.bprate,
            doctor_id: response.data.doctor_id,

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
        doctor_id: 0,
      doctors: [],

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

            <div className="form-group">
              <label htmlFor="doctor_id">Doctor</label>
              <Search items={this.state.doctors}
                      multiple={true}
                      getItemsAsync={this.getItemsAsync.bind(this)}
                      // onItemsChanged={this.onChangeDoctorId}
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
