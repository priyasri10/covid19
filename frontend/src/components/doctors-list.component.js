import React, { Component } from "react";
import DoctorDataService from "../services/doctor.service";
import { Link } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";

export default class DoctorsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveDoctors = this.retrieveDoctors.bind(this);
    this.refreshList = this.refreshList.bind(this);
    // this.removeAllDoctors = this.removeAllDoctors.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);

    this.state = {
      doctors: [],
      currentDoctor: null,
      currentIndex: -1,
      searchName: "",

      page: 1,
      count: 0,
      pageSize: 3,
    };

    this.pageSizes = [3, 6, 9];
  }

  componentDidMount() {
    this.retrieveDoctors();
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
      params["title"] = searchName;
    }

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  }

  retrieveDoctors() {
    const { searchName, page, pageSize } = this.state;
    const params = this.getRequestParams(searchName, page, pageSize);

    DoctorDataService.getAll(params)
      .then((response) => {
        const { doctors, totalPages } = response.data;

        this.setState({
          doctors: doctors,
          count: totalPages,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveDoctors();
    this.setState({
      currentDoctor: null,
      currentIndex: -1,
    });
  }

  setActiveDoctor(doctor, index) {
    this.setState({
      currentDoctor: doctor,
      currentIndex: index,
    });
  }

  removeAllDoctor() {
   DoctorDataService.deleteAll()
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
        this.retrieveDoctors();
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
        this.retrieveDoctors();
      }
    );
  }

  render() {
    const {
      searchName,
      doctors,
      currentDoctor,
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
                onClick={this.retrieveDoctors}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Doctors List</h4>

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

          <ul className="list-group">
            {doctors &&
              doctors.map((doctor, index) => (
                <li className={ "list-group-item" } onClick={() => this.setActiveDoctor(doctor, index)}
                    key={index}>
                  {doctor.name}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllDoctors}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentDoctor ? (
            <div>
              <h4>Doctor</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentDoctor.name}
              </div>



              <Link
                to={"/doctors/" + currentDoctor.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Doctor...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
