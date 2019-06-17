import React, { Component } from 'react'
import { Menu, Button, Image } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { signOut } from '../actions';
import history from '../history';

import logo from "../images/mayHotel_logo.png";

class MenuItem extends Component {

  onClickLogIn = () => {
    history.push('/login');
  }

  logout = () => {
    this.props.signOut()
  }

  renderAuthButton = () => {
    if (this.props.auth.isSignedIn) {
      return <Button onClick={this.logout} color="red">LogOut</Button>
    } else {
      return <Button onClick={this.onClickLogIn} color="blue">LogIn</Button>
    }
  }

  render() {
    return (
      <Menu attached='top'>
        <Link to='/'>
          <Menu.Item name='mayhotel' >
            <Image src={logo} size='mini' />
            mayHotel
          </Menu.Item>
        </Link>
        <Menu.Item position="right">
          {this.renderAuthButton()}
        </Menu.Item>
      </Menu>
    );
  };
};

const mapStateToProps = (state) => {
  const { auth } = state;
  return { auth };
};

export default connect(mapStateToProps, { signOut })(MenuItem);

