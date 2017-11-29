import React, { Component } from 'react';
import { createBulletin } from '../../api/bulletin';

class AddNewBulletin extends Component {

    handleAddNewFormSubmit = (event) => {
        this.props.toggleAddNewFormDisplay(event);
        createBulletin( this.form.message.value )
            .then((resp) => {
                this.props.setBulletinState('addNew', resp);
            })
        this.form.reset();
    }

   render() {
    return (
        <div>
        <div style={{ display: this.props.displayAddNewBulletinForm, height: this.props.heightAddNewBulletinForm}} className="add-new-notice">
            <div className="row">
                <div className="col-md-12">
                    <form id="addBulletinForm" ref={(form) => { this.form = form }}>
                        <div className="form-group">
                            <label htmlFor="title">Add New Notice:</label>
                            <input type="text" name="message" required="required" className="form-control" />
                        </div>
                        <input class="btn btn-primary" type="submit" onClick={(e) => {this.handleAddNewFormSubmit(e)}} value="Done" />
                    </form>
                </div>
            </div>
        </div>
        </div>
   );
  }
}

export default AddNewBulletin;