import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Panel, ListGroup, ListGroupItem, Button, Modal } from 'react-bootstrap';

class BoxView extends Component {
  static parseArray(inStr) {
    let str = inStr.substring(1, inStr.length - 1);
    let ids = str.split(',');
    str = ids.join(', ');
    ids = str.split('"');
    str = ids.join(' ');
    // str = str.split("\""),join("");
    return str;
  }

  constructor(props) {
    super(props);
    this.state = {
      display: null,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal(e, index) {
    // console.log('ShowModal is clicked');
    // console.log(index);
    e.preventDefault();
    this.setState({ display: index });
    // this.setState({ selectedEvent: eventId });
  }

  hideModal() {
    this.setState({
      display: null,
    });
  }

  render() {
    let list;
    let title;
    if (this.props.title === 'Teams') {
      title = (
        <header><h4><b>TEAMS</b></h4></header>
      );
      list = this.props.teams.map(team => (
        <ListGroup key={team._id} >
          <ListGroupItem href={`/team/${team.event._id}`}>
            {/* {team.members.map(member => ( */}
            {/* <p key={member._id}> */}
            {/* {member.profile.name} */}
            {/* </p> */}
            {/* ))} */}
            <Button type="button" bsStyle="link">
              {team.event.name}
            </Button>
          </ListGroupItem>
        </ListGroup>
      ));
    } else if (this.props.title === 'Events Hosted') {
      title = (
        <header><h4><b>EVENTS HOSTED</b></h4></header>
      );
      list = this.props.events.map((event, index) => (
        <ListGroup key={event._id}>
          <ListGroupItem >
            <Button type="button" bsStyle="link" onClick={e => this.showModal(e, index)}>
              {event.name}
            </Button>
          </ListGroupItem>
          <Modal show={this.state.display === index} onHide={this.hideModal}>
            <Modal.Header>
              <Modal.Title>{event.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <b>Start Date</b>
              {this.props.events ?
                (<p>{event.startDate}</p>) : (<p />)}
              <b>End Date</b>
              {this.props.events ?
                (<p>{event.endDate}</p>) : (<p />)}
              <b>Deadline for Team Registration</b>
              {this.props.events ?
                (<p>{event.registrationDeadline}</p>) : (<p />)}
              <b>Number of Teams</b>
              {this.props.events ?
                (<p>{event.teams.length}</p>) : (<p />)}
              <b>Event Description</b>
              {this.props.events ?
                (<p>{event.description}</p>) : (<p />)}
              <b>Max Number of Team Members</b>
              {this.props.events ?
                (<p>{event.max}</p>) : (<p />)}
              <b>Min Number of Team Members</b>
              {this.props.events ?
                (<p>{event.min}</p>) : (<p />)}
            </Modal.Body>
          </Modal>
        </ListGroup>
      ));
    }

    return (
      <div className="BoxView">
        <Panel header={title} bsStyle="primary">
          {list}
        </Panel>
      </div>
    );
  }
}

BoxView.propTypes = {
  title: PropTypes.string.isRequired,
  teams: PropTypes.array,
  events: PropTypes.array,
};

BoxView.defaultProps = {
  teams: [],
  events: [],
};

export default BoxView;
