import React, { Component } from 'react';
import { Col, Row, Grid, Button, Panel, Modal } from 'react-bootstrap';
import axios from 'axios';
import SkillsList from './SkillsList';
import PropTypes from 'prop-types';

const styles = {
  backgroundColor: '',
  height: '500px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignItems: 'center',
  flexWrap: 'wrap',
};

class Matching extends Component {
  constructor(props) {
    super(props);
    // const value = new Date().toISOString();
    this.state = {
      team: 'Foo Fighters',
      skillsOffered: ['html', 'css'],
      skillsWanted: ['node.js'],
      members: ['Dave', 'Victor'],
      show: false,
      given_team: {},

    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.reject = this.reject.bind(this);
    this.accept = this.accept.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  componentDidMount() {
    // const _this = this;
    let key = '';
    key = this.props.match.params.event;
    // Submit form via jQuery/AJAX
    // retrieve my team's id
    axios.post('/api/view_team', {
      event_id: key,
    })
      .then((response) => {
        if (response.data.success) {
          this.setState({ team_id: response.data.team._id });
          axios.post('/api/give_team', {
            event_id: key,
            team_id: this.state.team_id,
          })
            .then((response2) => {
              if (response2.data.success) {
                const memName = [];
                response2.data.target_team.members.forEach((mem) => {
                  memName.push(mem.profile.name);
                });
                this.setState({ team: response2.data.target_team._id });
                this.setState({ skillsOffered: response2.data.target_team.skillsOwned });
                this.setState({ skillsWanted: response2.data.target_team.skillsRequired });
                this.setState({ members: memName });
                this.setState({ given_team: response2.data.target_team });
              } else if (response2.data.allFound) {
                this.showModal();
              }
            })
            .catch((error) => {
              alert(error);
            });
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }

  reject() {
    alert(`Team ${this.state.team} rejected`);
    // get new team from jQuery/AJAX; reject
    let key = '';
    key = this.props.match.params.event;
    axios.post('/api/reject_team', {
      event_id: key,
      team_id: this.state.team_id,
      reject_team_id: this.state.given_team._id,
    })
      .then((response) => {
        if (response.data.success) {
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
        console.log('failed1');
      });
  }

  accept() {
    // alert(`Team ${this.state.team} <3`);
    axios.post('/api/team_matched', {
      event_id: this.props.match.params.event,
      team1: this.state.team_id,
      team2: this.state.given_team._id,
    })
      .then((response) => {
        if (response.data.success) {
          alert('Teammate found!!!Check your teammate in the team setting or keep looking for other teams');
        } else if (response.data.refresh) {
          alert('Team added successfully <3');
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
        console.log('failed1');
      });
    // this.setState({ team: 'Another option' });
    // tell jQuery/AJAX team is formed; accept
  }

  refresh() {
    window.location.reload();
  }

  showModal() {
    this.setState({ show: true });
  }

  hideModal() {
    this.setState({
      show: false,
    });
  }


  render() {
    return (
      <div className="Matching" style={styles}>
        <h1 style={{ color: 'grey' }} >Matching you with teams in {this.props.match.params.event} ...</h1>
        <Grid>
          <Row className="show-grid">
            <Col md={3}>
              <Button bsStyle="danger" bsSize="large" onClick={this.reject}>Reject</Button>
            </Col>
            <Col md={5} style={{ textAlign: 'left' }}>
              <Panel header={this.state.team}>
                <h4><SkillsList skills={this.state.skillsOffered} title="Skills: " /></h4>
                <hr />
                <h4><SkillsList skills={this.state.skillsWanted} title="Skills Wanted: " /></h4>
                <hr />
                <h4><SkillsList skills={this.state.members} title="Members: " /></h4>
                <hr />
                <div>
                  <h4>Project: </h4>
                </div>
              </Panel>
            </Col>
            <Col md={3}>
              <Button bsStyle="success" bsSize="large" onClick={this.accept}>Accept</Button>
            </Col>
          </Row>
        </Grid>

        <Modal show={this.state.show} onHide={this.hideModal}>
          <Modal.Body>
            <h1>Oops! No matching teams are available.</h1>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="success" onClick={this.refresh}>
            Go Search Again
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

Matching.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Matching;
