import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SkyLight from 'react-skylight';

const AddRestaurant = (props) => {
    const [open, setOpen] = useState(false);
    const [restaurant, setRestaurant] = useState({
        name: '', address: '', category: '', description: '', active:'', user: ''
    });
    // Open the modal form
    const handleClickOpen = () => {
        setOpen(true);
    };

// Close the modal form
    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setRestaurant({...restaurant, [event.target.name]: event.target.value});
    }

    const handleSave = () => {
        props.addRestaurant(restaurant);
        handleClose();
    }

    return (
        <div>
            <button style={{margin: 10}} onClick={handleClickOpen}>New Restaurant</button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Restaurant</DialogTitle>
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

export default AddRestaurant;
