import React, { Component } from "react";
import PatientDataService from "../services/patient.service";
import { Link } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";

export default class PatientsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrievePatients = this.retrievePatients.bind(this);
    this.refreshList = this.refreshList.bind(this);
    // this.removeAllDoctors = this.removeAllDoctors.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);

    this.state = {
      patients: [],
      currentPatient: null,
      currentIndex: -1,
      searchName: "",

      page: 1,
      count: 0,
      pageSize: 3,
    };

    this.pageSizes = [3, 6, 9];
  }

  componentDidMount() {
    this.retrievePatients();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName,
    });
  }

  getRequestParams(searchName, page, pageSize) {
    let params = {};

    if (searchName) {
      params["name"] = searchName;
    }

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  }

  retrievePatients() {
    const { searchName, page, pageSize } = this.state;
    const params = this.getRequestParams(searchName, page, pageSize);

    PatientDataService.getAll(params)
      .then((response) => {
        const { patients, totalPages } = response.data;

        this.setState({
          patients: patients,
          count: totalPages,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrievePatients();
    this.setState({
      currentPatient: null,
      currentIndex: -1,
    });
  }

  setActivePatient(patient, index) {
    this.setState({
      currentPatient: patient,
      currentIndex: index,
    });
  }

  removeAllPatient() {
   PatientDataService.deleteAll()
      .then((response) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  handlePageChange(event, value) {
    this.setState(
      {
        page: value,
      },
      () => {
        this.retrievePatients();
      }
    );
  }

  handlePageSizeChange(event) {
    this.setState(
      {
        pageSize: event.target.value,
        page: 1
      },
      () => {
        this.retrievePatients();
      }
    );
  }

  render() {
    const {
      searchName,
      patients,
      currentPatient,
      currentIndex,
      page,
      count,
      pageSize,
    } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.retrievePatients}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Patients List</h4>

          <ul className="list-group">
            {patients &&
            patients.map((patient, index) => (
                <li className={ "list-group-item" } onClick={() => this.setActivePatient(patient, index)}
                    key={index} >
                  {patient.name}
                </li>
            ))}
          </ul>

          <div className="mt-3">
            {"Items per Page: "}
            <select onChange={this.handlePageSizeChange} value={pageSize}>
              {this.pageSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>

            <Pagination
              className="my-3"
              count={count}
              page={page}
              siblingCount={1}
              boundaryCount={1}
              variant="outlined"
              shape="rounded"
              onChange={this.handlePageChange}
            />
          </div>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllPatients}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentPatient ? (
            <div>
              <h4>Patient</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentPatient.name}
              </div>



              <Link
                to={"/patients/" + currentPatient.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <Link
                  to={"/patients/add"}
                  className="badge badge-warning"
                  onClick={this.addPatient}
              >
                Add Patient
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }
}
