import React, { Component } from 'react';
import {SERVER_URL} from '../constants.js';
import ReactTable from "react-table";
import { ToastContainer, toast } from 'react-toastify';
import {confirmAlert} from "react-confirm-alert";
import  'react-confirm-alert/src/react-confirm-alert.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-table/react-table.css';
import AddRestaurant from './AddRestaurant.js';
import EditRestaurant from './EditRestaurant.js';

class RestaurantList extends Component {
    constructor(props){
        super(props);
        this.state = {restaurants: [] };
    }

    componentDidMount() {
        this.fetchRestaurants();
    }

    fetchRestaurants = () => {
        fetch(SERVER_URL + 'api/restaurants')
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    restaurants: responseData._embedded.restaurants,
                });
            })
            .catch(err => console.error(err));
    };

    onDelClick = (link) => {
        if (window.confirm('Are you sure to delete?')) {
            fetch(link, {method: 'DELETE'})
                .then(res => {
                    toast.success("Restaurante deleted", {
                        position: toast.POSITION.BOTTOM_LEFT
                    });
                    this.fetchRestaurants();
                })
                .catch(err => {
                    toast.error("Something went wrong", {
                        position: toast.POSITION.BOTTOM_LEFT
                    });
                    console.log(err)
                })
        }
    };

    addRestaurant(restaurant){
        fetch(SERVER_URL + 'api/restaurants',
            { method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(restaurant)
            })
            .then(res => this.fetchRestaurants())
            .catch(err => console.log(err))
    };

    confirmDelete = (link) => {
        confirmAlert({
            message: 'Are you sure to delete?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.onDelClick(link)
                },
                {
                    label: 'No',
                }
            ]
        })
    };

    updateRestaurant(restaurant, link) {
        fetch(link,
            { method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(restaurant)
            })
            .then(res => {
                toast.success("Changes saved", {
                    position: toast.POSITION.BOTTOM_LEFT
                });
                this.fetchRestaurants();
            })
            .catch(err =>
                toast.error("Error when saving", {
                    position: toast.POSITION.BOTTOM_LEFT
                })
            )
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
            sortable: false,
            filterable: false,
            width: 100,
            accessor: '_links.self.href',
            Cell: ({value, row}) => (<EditRestaurant restaurant={row} link={value}
                                              updateRestaurant={this.updateRestaurant} fetchRestaurants={this.fetchRestaurants} />),
        }, {
            id: 'delbutton',
            sortable: false,
            filterable: false,
            width: 100,
            accessor: '_links.self.href',
            Cell: ({value}) => (<button onClick={()=>{this.confirmDelete(value)}}>Delete</button>)
        }];

        return (
            <div className="App">
                <AddRestaurant addRestaurant={this.addRestaurant} fetchRestaurants={this.fetchRestaurants}/>
                <ReactTable data={this.state.restaurants} columns={columns}
                            filterable={true} pageSixe={10}/>
                <ToastContainer autoClose={1500} />
    </div>
        );
    }
}

export default RestaurantList;
