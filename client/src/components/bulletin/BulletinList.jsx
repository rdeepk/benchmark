import React, { Component } from 'react';
import Bulletin from './Bulletin';
import AddNewBulletin from './AddNewBulletin'; 

class BulletinList extends Component {
  constructor() {
    super();
        this.state= {
            displayAddNewBulletinForm: 'none'
        }
    }

    /*
    *	Toggles the display of add new bulletin form.
    */
    toggleAddNewFormDisplay = (event) => {
        event.preventDefault();
        const { displayAddNewBulletinForm } = this.state;
        this.setState({
            displayAddNewBulletinForm :  displayAddNewBulletinForm === "block" ? 'none' : 'block'
        })
    }

  render() {
    const { bulletin } = this.props;
    let contentJSX;
    if(bulletin) {
      contentJSX = bulletin.messages.map((item, i) => {
        return <Bulletin bulletin={item}
                         writeAccess={ bulletin.writeAccess ? true : false}
                         setBulletinState={this.props.setBulletinState}
                         role={this.props.role}
                />
       })
    }
    return (
      <div className="content">
          <div className="row sub-header">
            <div className="col-md-8">
              <h1>Notices</h1>
            </div>
            { (this.props.role === 'teacher' || this.props.role === 'admin') && <div className="col-md-4">
              <a className="btn btn-primary" href="" onClick={(e) => {this.toggleAddNewFormDisplay(e)}}><i class="fa fa-plus" aria-hidden="true"></i><span>Add New</span></a>
            </div>}
          </div>
          <div className="row">
            <div className="col-sm-12">
              {(this.props.role === 'teacher' || this.props.role === 'admin') && 
                                      <AddNewBulletin setBulletinState={this.props.setBulletinState}
                                                      displayAddNewBulletinForm={this.state.displayAddNewBulletinForm}
                                                      toggleAddNewFormDisplay={this.toggleAddNewFormDisplay} />}
            </div>
          </div>
          <div>
            {contentJSX}
          </div>          
      </div>
   );
  }
}

export default BulletinList;