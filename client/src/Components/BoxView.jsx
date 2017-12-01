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

    if (this.props.title === 'Teams') {
      list = this.props.teams.map(team => (
        <ListGroup key={team._id}>
          <ListGroupItem href={`/team/${team.event._id}`}>
            {team.members.map(member => (
              <p key={member._id}>
                {member.profile.name}
              </p>
            ))}
          </ListGroupItem>
        </ListGroup>
      ));
    } else if (this.props.title === 'Events Hosted') {
      list = this.props.events.map((event, index) => (
        <ListGroup key={event._id}>
          <ListGroupItem>
            <Button type="button" bsStyle="link" onClick={e => this.showModal(e, index)}>
              {event.name}
            </Button>
          </ListGroupItem>
          <Modal show={this.state.display === index} onHide={this.hideModal}>
            <Modal.Header>
              <Modal.Title>Event Detail</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <b>Start Date</b>
              {this.props.events ?
                (<p>{event.start_date}</p>) : (<p />)}
              <b>End Date</b>
              {this.props.events ?
                (<p>{event.end_date}</p>) : (<p />)}
              <b>Deadline for Team Registration</b>
              {this.props.events ?
                (<p>{event.registration_deadline}</p>) : (<p />)}
              <b>Teams</b>
              {this.props.events ?
                (<p>{BoxView.parseArray(JSON.stringify(event.teams))}</p>) : (<p />)}
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
        <Panel header={this.props.title} bsStyle="primary">
          {list}
        </Panel>
      </div>
    );
  }
}

BoxView.propTypes = {
  title: PropTypes.string.isRequired,
  teams: PropTypes.array.isRequired,
  events: PropTypes.array.isRequired,
};

export default BoxView;
