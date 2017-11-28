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
                />
       })
    }
    return (
      <div className="content">
          <div className="row">
            <div className="col-sm-8">
              <h1>Notices</h1>
            </div>
            <div className="col-sm-4">
              <a className="btn btn-success pull-right new" href="" onClick={(e) => {this.toggleAddNewFormDisplay(e)}}><i class="fa fa-plus" aria-hidden="true"></i><span>Add New</span></a>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              {bulletin.writeAccess && <AddNewBulletin setBulletinState={this.props.setBulletinState}
                                                      displayAddNewBulletinForm={this.state.displayAddNewBulletinForm}
                                                      toggleAddNewFormDisplay={this.toggleAddNewFormDisplay} />}
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
            {contentJSX}
            </div>
          </div>          
      </div>
   );
  }
}

export default BulletinList;