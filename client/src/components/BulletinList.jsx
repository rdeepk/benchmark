import React, { Component } from 'react';
import Bulletin from './Bulletin';
import AddNewBulletin from './AddNewBulletin'; 

class BulletinList extends Component {

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
      <div>
          {bulletin.writeAccess && <AddNewBulletin setBulletinState={this.props.setBulletinState} />}
          {contentJSX}
      </div>
   );
  }
}

export default BulletinList;