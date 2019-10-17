import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const EditRestaurant = (props) => {
    const [open, setOpen] = useState(false);
    const [restaurant, setRestaurant] = useState({
        name: '', address: '', category: '', description: '', active:'', user: ''});

    const handleClickOpen = () => {
        setRestaurant({name: props.restaurant.name, address: props.restaurant.address, category: props.restaurant.category,
            description: props.restaurant.description, active: props.restaurant.active, user: props.restaurant.user})
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setRestaurant({...restaurant, [event.target.name]: event.target.value});
    };

    // Update and close modal form
    const handleSave = () => {
        props.updateRestaurant(restaurant, props.link);
        handleClose();
    }

    return (
        <div>
            <button onClick={handleClickOpen}>Edit</button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit restaurant</DialogTitle>
                <DialogContent>
                    <input type="text" placeholder="Name" name="name"
                           value={restaurant.name} onChange={handleChange}/><br/>
                    <input type="text" placeholder="Address" name="address"
                           value={restaurant.address} onChange={handleChange}/><br/>
                    <input type="text" placeholder="Category" name="category"
                           value={restaurant.category} onChange={handleChange}/><br/>
                    <input type="text" placeholder="Description" name="description"
                           value={restaurant.description} onChange={handleChange}/><br/>
                    <input type="text" placeholder="Active" name="active"
                           value={restaurant.active} onChange={handleChange}/><br/>
                    <input type="text" placeholder="User" name="user"
                           value={restaurant.user} onChange={handleChange}/><br/>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleClose}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default EditRestaurant;
