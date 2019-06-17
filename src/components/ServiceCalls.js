import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';

import { fatchCalls } from '../actions';

class ServiceCalls extends Component {

  componentWillMount(){
    this.props.fatchCalls(this.props.auth.payload.hotel._id)
  }

  renderList = () =>{
    const calls = this.props.calls.payload;
    const listItems = calls.map((call) =>
      <li>{call}</li>
    );
    return (
      <ul>{listItems}</ul>
    );
  }


render(){

  return (
    <div>renderList</div>
  )
}
}


const mapStateToProps = (state) => {
  const { auth, calls } = state;
  return { auth, calls };
};

export default connect(mapStateToProps, { fatchCalls })(ServiceCalls);