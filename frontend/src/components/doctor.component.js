import React, { Component } from "react";
import DoctorDataService from "../services/doctor.service";

export default class Doctor extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.getDoctor = this.getDoctor.bind(this);
    this.updateDoctor = this.updateDoctor.bind(this);
    this.deleteDoctor = this.deleteDoctor.bind(this);

    this.state = {
      currentDoctor: {
        id: null,
        name: "",
        email: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getDoctor(this.props.match.params.id);
  }


  onChangeName(e) {
    const name = e.target.value;
    this.setState(function(prevState) {
      //this.name = name;
      return {
        currentDoctor: {
          ...prevState.currentDoctor,
          name: name
        }
      };
    });
  }
  onChangeEmail(e) {
    const email = e.target.value;
    this.setState(function(prevState) {
      //this.name = name;
      return {
        currentDoctor: {
          ...prevState.currentDoctor,
          email: email
        }
      };
    });
  }

  getDoctor(id) {
    DoctorDataService.get(id)
        .then(response => {
          this.setState({
            currentDoctor: response.data
          });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
  }

  updateDoctor() {
   DoctorDataService.update(
      this.state.currentDoctor.id,
      this.state.currentDoctor
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The doctor was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteDoctor() {
    DoctorDataService.delete(this.state.currentDoctor.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/doctors')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentDoctor } = this.state;

    return (
      <div>
        {currentDoctor ? (
          <div className="edit-form">
            <h4>Doctor</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentDoctor.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Email</label>
                <input
                    type="text"
                    className="form-control"
                    id="email"
                    value={currentDoctor.email}
                    onChange={this.onChangeEmail}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteDoctor}
            >
              Delete
            </button>

            <button
              type="submit"
              className={"badge badge-success"}
              onClick={this.updateDoctor}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Doctor...</p>
          </div>
        )}
      </div>
    );
  }
}
