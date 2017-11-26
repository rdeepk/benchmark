import React, { Component } from 'react';
// import { Route } from 'react-router-dom';

class Bulletin extends Component {
  render() {
    let contentJSX = this.props.bulletin.messages.map((item, i) => {
      return <div className="message">{item.message}</div>
    })
    return (
      <div>
        <a href="">Add New</a>
      {contentJSX}</div>
   );
  }
}

export default Bulletin;