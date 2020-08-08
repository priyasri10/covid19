import Search from 'react-search'
import ReactDOM from 'react-dom'
import React, { Component, PropTypes } from 'react'

export default class AutoCompleteComponent extends Component {

    constructor (props) {
        super(props)
        this.state = { repos: [] }
    }

    getItemsAsync(searchValue, cb) {
       // let url = `https://api.github.com/search/repositories?q=${searchValue}&language=javascript`
        let url = `http://localhost:8080/api/doctors?title=${searchValue}&page=0&size=100`


        fetch(url).then( (response) => {
            return response.json();
        }).then((results) => {
            if(results.doctors != undefined){
                let items = results.doctors.map( (res, i) => { return { id: res.id, value: res.name } })
                this.setState({ repos: items })
                cb(searchValue)
            }
        });
    }

    render () {
        return (
            <div>
                <Search items={this.state.repos}
                        multiple={true}
                        getItemsAsync={this.getItemsAsync.bind(this)}
                        //onItemsChanged={this.HiItems.bind(this)}
                />
            </div>
        )
    }
}