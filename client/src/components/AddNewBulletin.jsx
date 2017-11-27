import React, { Component } from 'react';
import { createBulletin } from '../api/bulletin';

class AddNewBulletin extends Component {
constructor() {
    super();
        this.state= {
            displayAddNewBulletinForm: 'none'
        }
    }

    toggleAddNewFormDisplay = (event) => {
        event.preventDefault();
        const { displayAddNewBulletinForm } = this.state;
        this.setState({
            displayAddNewBulletinForm :  displayAddNewBulletinForm === "block" ? 'none' : 'block'
        })
    }

    handleAddNewFormSubmit = (event) => {
        this.toggleAddNewFormDisplay(event);
        createBulletin( this.form.message.value )
            .then((resp) => {
                this.props.setBulletinState('addNew', resp);
            })
    }

   render() {
    return (
        <div>
        <a href="" onClick={(e) => {this.toggleAddNewFormDisplay(e)}}>Add New</a>
        <div style={{ display: this.state.displayAddNewBulletinForm }} className="add-new">
            <div className="row">
                <div className="col-md-10 col-md-offset-1">
                    <form id="addBulletinForm" ref={(form) => { this.form = form }}>
                        <div className="form-group">
                            <label htmlFor="title">Message:</label>
                            <input type="text" name="message" required="required" className="form-control" />
                        </div>
                        <button type="submit" onClick={(e) => {this.handleAddNewFormSubmit(e)}}>Done</button>
                    </form>
                </div>
            </div>
        </div>
        </div>
   );
  }
}

export default AddNewBulletin;