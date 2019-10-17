import React, { Component } from 'react';
import {SERVER_URL} from '../constants.js';
import ReactTable from "react-table";
import 'react-table/react-table.css';

class RestaurantList extends Component {
    constructor(props){
        super(props);
        this.state = {restaurants: [] };
    }


    fetchRestaurants = () => {
        fetch((SERVER_URL + 'api/restaurants'))
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    restaurants: responseData._embedded.restaurants,
                });
            })
            .catch(err => console.error(err));
    }

    componentDidMount() {
        this.fetchRestaurants();
    }

    onDelClick = (link) => {
        fetch(link, {method: 'DELETE'})
            .then(res => this.fetchRestaurants())
            .catch(err => console.error(err))
    }


    render() {
        const columns = [{
            Header: 'name',
            accessor: 'name'
        }, {
            Header: 'address',
            accessor: 'address'
        }, {
            Header: 'category',
            accessor: 'category'
        }, {
            Header: 'description',
            accessor: 'description'
        }, {
            Header: 'active',
            accessor: 'active'
        }, {
            Header: 'user',
            accessor: 'user'
        },{
           id: 'delbutton',
           sortable: false,
           filterable: false,
           width: 100,
           accessor: '_Links.self.href',
           Cell: ({value}) => (<button onClick={ () => {this.onDelClick(value)}}>Delete</button>)
        }]

        return (
            <div className="App">
                <ReactTable data={this.state.restaurants} columns={columns}
                            filterable={true}/>
            </div>
        );
    }
}

export default RestaurantList;
