import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from "react-table";
import Loader from "react-loader";
import { Header, Container } from 'semantic-ui-react';

import { fetchReservations } from '../actions';
import logo from "../images/mayHotel_logo.png";

const rtl = {
  direction: "rtl",
}

const columns = [
  {
    Header: "שם פרטי",
    accessor: "user.firstname"
  },
  {
    Header: "שם משפחה",
    accessor: "user.lastname"
  },
  {
    Header: "ת.ז.",
    accessor: "user._id"
  },
  {
    Header: "כמות מוזמנים",
    accessor: "amount"
  }
]

class EventList extends Component {
  state = {
    loading: true,
    reservationIndex: null,
    event: null
  }

  getTrProps = (state, rowInfo, instance) => {
    if (rowInfo) {
      const reservation = this.props.reservations[rowInfo.index];
      return {
        onClick: (e) => {
          this.setState({ reservationIndex: rowInfo.index })
          console.log(reservation)
        },
        style: {
          background:
            rowInfo.index === this.state.reservationIndex ? '#2196f3' : rowInfo.index === 0 ? 'linear-gradient(to bottom,  #f2f2f2 0%, #ffffff 30%)' : 'white',
          color: rowInfo.index === this.state.reservationIndex ? "white" : "black"
        }


      }

    }
    return {};
  }

  async componentDidMount() {
    if (this.props.location.state.event) {
      this.setState({ event: this.props.location.state.event })
      console.log(this.props.location.state.event._id)
      await this.props.fetchReservations(this.props.location.state.event._id)
      this.setState({ loading: false })
    }
  };

  renderHeader = () => {
    return (
      <Header as="h2" color="blue" textAlign="center" style={rtl} >
        {`הזמנות של ${this.state.event.name}`} <br/>
        {` בתאריך ${this.state.event.string.date} שעה ${this.state.event.string.time}`}
      </Header>
    )
  }

  render() {

    return (
      <Container textAlign='center'>
        <Loader loaded={!this.state.loading}>
          {this.state.event !== null ? this.renderHeader() : <></>}
          <ReactTable
            columns={columns}
            data={this.props.reservations}
            minRows={1}
            getTrProps={this.getTrProps}
          />
        </Loader>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return { reservations: Object.values(state.reservations) };
}

export default connect(mapStateToProps, { fetchReservations })(EventList)