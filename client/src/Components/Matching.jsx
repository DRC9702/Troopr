import React, { Component } from 'react';
import { Col, Row, Grid, Button, Panel, Modal } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import SkillsList from './SkillsList';

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
  static refresh() {
    window.location.reload();
  }

  constructor(props) {
    super(props);
    // const value = new Date().toISOString();
    this.state = {
      team: '--------',
      event: '',
      skillsOffered: [],
      skillsWanted: [],
      members: [],
      show: false,
      given_team: {},
      modalMessage: '',

    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.reject = this.reject.bind(this);
    this.accept = this.accept.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.redirect = this.redirect.bind(this);
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
          // console.log(response.data.team);
          this.setState({ team_id: response.data.team._id, event: response.data.team.event.name });
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
                this.showModal('Oops! No more teams are available.');
              }
            })
            .catch((error) => {
              this.showModal(`Oops! There was a problem...${error}`);
            });
        } else {
          this.showModal(response.data.message); // eslint-disable-line
        }
      })
      .catch((error) => {
        this.showModal(`Oops! There was a problem...${error}`);
      });
  }

  redirect() {
    this.props.history.push('/dashboard');
  }

  reject() {
    // alert(`Team ${this.state.team} rejected`); // eslint-disable-line
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
        console.log(error); // eslint-disable-line no-console
        this.showModal(`Oops! There was a problem...${error}`); // eslint-disable-line no-console
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
          this.showModal('Teammate found! Check your teammate in dashbaord or keep looking for other teams'); // eslint-disable-line
        } else if (response.data.refresh) {
          // alert('Team added successfully <3'); // eslint-disable-line
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error); // eslint-disable-line no-console
        this.showModal(`Oops! There was a problem...${error}`);// eslint-disable-line no-console
      });
    // this.setState({ team: 'Another option' });
    // tell jQuery/AJAX team is formed; accept
  }

  showModal(msg) {
    this.setState({ show: true, modalMessage: msg });
  }

  hideModal() {
    this.setState({
      show: false,
    });
  }


  render() {
    return (
      <div className="Matching" style={styles}>
        <h1 style={{ color: 'grey' }} >Matching you with teams in {this.state.event} ...</h1>
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
            <h1>{this.state.modalMessage}</h1>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="success" onClick={Matching.refresh}>
            Go Search Again
            </Button>
            <Button bsStyle="info" onClick={this.redirect}>
            Go to Dashboard
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

Matching.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(Matching);
