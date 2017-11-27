import React, { Component } from 'react';
import { updateBulletin, deleteBulletin } from '../api/bulletin';
import { isLoggedIn } from '../utils/AuthService';

class Bulletin extends Component {
    constructor(props) {
        super(props);
        this.state= {
            displayEditBulletinForm: 'none',
            bulletin: props.bulletin
        }
    }

    toggleEditFormDisplay = (event) => {
        event.preventDefault();
        const { displayEditBulletinForm } = this.state;
        this.setState({
            displayEditBulletinForm :  displayEditBulletinForm === "block" ? 'none' : 'block'
        })
    }

    deleteBulletin = (event) => {
        event.preventDefault();
        deleteBulletin(event.target.id)
                .then((resp) => {
                  console.log(resp);
                  this.props.setBulletinState('delete', {id: resp.message._id});
                })
      }

    setEditedValue = (event) => {
        event.preventDefault();
        this.state.bulletin.message = this.form.message.value;
        this.setState({
            bulletin: this.state.bulletin
        })
    }

    handleEditFormSubmit = (event) => {
        this.toggleEditFormDisplay(event);
        updateBulletin(this.state.bulletin)
        .then((resp) => {
            console.log(resp);
            this.props.setBulletinState('update', {id: resp._id, message:resp.message});
          })
    }

   render() {
    const { bulletin } = this.props;
    return (
        <div>
            {this.props.writeAccess ?
                <div>
                    <span className="message">{bulletin.message}</span>
                    <a href="" id={bulletin._id} onClick={(e) => {this.toggleEditFormDisplay(e)}} >Edit</a>
                    <div style={{ display: this.state.displayEditBulletinForm }} className="edit">
                          <div className="row">
                              <div className="col-md-10 col-md-offset-1">
                                  <form id="editBulletinForm" ref={(form) => { this.form = form }} onChange={(e) => { this.setEditedValue(e) }}>
                                      <div className="form-group">
                                          <label htmlFor="title">Message:</label>
                                          <input type="text" id={bulletin._id} name="message" value={this.state.bulletin.message} required="required" className="form-control" />
                                      </div>
                                      <button type="submit" onClick={(e) => {this.handleEditFormSubmit(e)}}>Done</button>
                                  </form>
                              </div>
                          </div>
                      </div>
                    <a href="" id={bulletin._id} value={bulletin.message} onClick={(e) => {this.deleteBulletin(e)}} >Delete</a>
                </div>
                :  <div className="message">{bulletin.message}</div>}
        </div>
   );
  }
}

export default Bulletin;