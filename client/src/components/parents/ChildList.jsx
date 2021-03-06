import React, { Component } from 'react';
import {getAttendance, getChildren} from '../../api/parents';
import Child from './Child';

/*
*  Component populates the children of parent.
*/
class childList extends Component {
  constructor() {
    super();
    this.state = {
      children : [],
      selectedChild : 'Select Child',
      selectedAttendance: [],
      displayChild: 'none',
      name: ''
    }
  }
  
    componentDidMount() {
      getChildren().then((data)=> {
        this.setState({children: data.children})
      })
    }
    
  /*
  *  Handles the onchange event of children dropdown.
  */
    handleChild = (e) => {
      this.setState({
        selectedChild: e.target.value,
        name: e.target[e.target.selectedIndex].getAttribute('name'),
        displayChild: e.target.value === 'Select Child'? 'none' : 'block'
      })
      getAttendance(e.target.value).then((data)=> {
        this.setState({selectedAttendance: data.attendance})
      })
    }

    render() {
      let childSelectJSX;
      if(this.state.children) {
        childSelectJSX = this.state.children.map((child, i) => {
          return <option name={child.name} value={child._id}>{child.name}</option>
        })
      }
        return(
          <div>
            <div className="content attendance-header flexed">
            <div>
              <h1>Attendance</h1>
            </div>
            <div>
              <select class="custom-select" id="inlineFormCustomSelect" value = {this.state.selectedChild} onChange={this.handleChild}>
              <option name='' value="Select Child">Select Child</option>
              {childSelectJSX}</select>
            </div>
          </div>
          {this.state.selectedChild === 'Select Child'? <p>Please select the student to view attendance.</p>:''}
          <div style ={{display: this.state.displayChild}}>
              <Child attendance={this.state.selectedAttendance} name={this.state.name} selectedChild={this.state.selectedChild} />
            </div>
          </div>
        )
      }
    }

export default childList;