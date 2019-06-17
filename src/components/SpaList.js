import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from "react-table";
import styled from "styled-components";
import Loader from "react-loader";
import { Header, Image, Card, Container, Icon } from 'semantic-ui-react';


const CardWrapper = styled.div`
  position:absolute;
  top: 50%;
  left:50%;
  transform: translate(-50%,-50%);
  z-index:1000;
  direction: rtl;
  font-size:18px;
`;

const columns = [
  {
    Header: "שעה",
    accessor: "string.time"
  },
  {
    Header: "תאריך",
    accessor: "string.date"
  },
  {
    Header: "מטפל",
    accessor: "therepist"
  },
  {
    Header: "טיפול",
    accessor: "treatment"
  },
  {
    Header: "ת.ז. מטופל",
    accessor: "user._id"
  }
]

class SpaList extends Component {
  state = {
    loading: true,
    spaIndex: null,
    occupied: false
  }

  getTrProps = (state, rowInfo, instance) => {
    if (rowInfo) {
      const spa = this.props.spa[rowInfo.index];
      return {
        onClick: (e) => {
          this.setState({ spaIndex: rowInfo.index, occupied: spa.occupied })
        },
        style: {
          background:
            rowInfo.index === this.state.spaIndex ? '#2196f3' : spa.occupied ? 'red' : 'green',
          color: "white"
        }
      }
    }
    return {};
  }

  handleXclick = () => {
    this.setState({ spaIndex: null })
  }

  componentDidMount() {
    if (this.props.spa.length > 0)
      this.setState({ loading: false })
  };

  renderSpaData = () => {
    const spa = this.props.spa[this.state.spaIndex]
    return (
      <CardWrapper key={spa._id}>
        <Card fluid>
          <Icon onClick={this.handleXclick} borderd='false' size='large' corner='top right' name='times' color='grey' />
          <Card.Content>

            <Card.Header>תור לספא</Card.Header>
            <Card.Meta>
              {`תאריך: ${spa.string.date}`}<br />
              {` שעה:  ${spa.string.time}`}<br />
              {`טיפול:  ${spa.treatment}`}<br />
              {` מטפל:  ${spa.therepist}`}<br />
            </Card.Meta><br />
            <Card.Description >
              {`שם מטופל: ${spa.user.firstname} ${spa.user.lastname}`}<br />
              {` ת.ז:  ${spa.user._id}`}<br />
              {` אימייל:  ${spa.user.email}`}<br />
              {`מס' טלפון:  ${spa.user.phone}`}<br />
              {` כתובת:  ${spa.user.address}`}<br />
            </Card.Description>
          </Card.Content>
        </Card>
      </CardWrapper >
    )
  };

  render() {
    return (
      <Container textAlign='center'>
        <Loader loaded={!this.state.loading}>
          <Header as="h2" color="blue" textAlign="center">
            תורים לספא
         </Header>
          {this.state.spaIndex !== null && this.state.occupied ? this.renderSpaData() : <></>}
          <ReactTable
            columns={columns}
            data={this.props.spa}
            minRows={1}
            getTrProps={this.getTrProps}
          />
        </Loader>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return { spa: Object.values(state.spa) };
}

export default connect(mapStateToProps, {})(SpaList)