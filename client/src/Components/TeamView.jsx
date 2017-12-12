import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Col, Row, Grid, Button, Panel, FormGroup, ControlLabel, Modal, ListGroup, Form, FormControl, ListGroupItem, ButtonToolbar } from 'react-bootstrap';
import axios from 'axios';
import PropTypes from 'prop-types';
import SelectSkills from './SelectSkills';
import SkillsList from './SkillsList';
import Background from '../Images/bgimg1.jpg';

require('../styles/TeamView.css');

class TeamView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event_id: '',
      owned: [],
      required: [],
      preferred: [],
      projectName: '',
      members: [],
      plan: '',
      display: false,
    };

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.changeCheckbox = this.changeCheckbox.bind(this);
    this.handleProjectNameChange = this.handleProjectNameChange.bind(this);
    this.handlePlanChange = this.handlePlanChange.bind(this);
    this.editTeam = this.editTeam.bind(this);
    this.matchTeam = this.matchTeam.bind(this);
  }

  componentDidMount() {
    // console.log(this.props.match.params.event);
    // console.log(typeof(this.props.match.params.event));

    const eventId = this.props.match.params.event;

    axios.post('/api/view_team', {
      event_id: eventId,
    })
      .then((response) => {
        // console.log(response.data./success);
        if (response.data.success) {
          // console.log(response.data.team);
          const { team } = response.data;
          this.setState({
            event_id: team.event._id,
            owned: team.skillsOwned,
            required: team.skillsRequired,
            preferred: team.skillsPrefered,
            projectName: team.projectName,
            plan: team.projectPlan,
            members: team.members,
            event: team.event.name,
          });
          // console.log(team.projectPlan)
        } else if (response.data.message === 'Need login first.') {
          this.props.history.push('/');
        } else {
          // console.log('events query failed');
          // eslint-disable-next-line no-undef
          alert(response.data.message); // eslint-disable-line no-alert
        }
      })
      .catch((error) => {
        console.log(error); // eslint-disable-line no-console
      });
  }

  changeCheckbox(e, title) {
    // console.log(e);
    if (e.target.checked === true) {
      if (title === 'Skills You Have') {
        this.state.owned.push(e.target.value);
      } else if (title === 'Skills You Require') {
        this.state.required.push(e.target.value);
      } else if (title === 'Skills You Prefer') {
        this.state.preferred.push(e.target.value);
      }
    } else { // Logically, it's clearer for us to split the flow this way
      if (title === 'Skills You Have') { // eslint-disable-line no-lonely-if
        const index = this.state.owned.indexOf(e.target.value);
        if (index > -1) {
          this.state.owned.splice(index, 1);
        }
      } else if (title === 'Skills You Require') {
        const index = this.state.required.indexOf(e.target.value);
        if (index > -1) {
          this.state.required.splice(index, 1);
        }
      } else if (title === 'Skills You Prefer') {
        const index = this.state.preferred.indexOf(e.target.value);
        if (index > -1) {
          this.state.preferred.splice(index, 1);
        }
      }
    }
    // console.log(this.state.owned);
    // console.log(this.state.required);
    // console.log(this.state.preferred);
    this.forceUpdate();
  }

  handleProjectNameChange(e) {
    this.setState({ projectName: e.target.value });
    // console.log(this.state.projectName);
  }

  handlePlanChange(e) {
    this.setState({ plan: e.target.value });
    // console.log(this.state.plan);
  }

  showModal() {
    this.setState({ display: true });
  }

  hideModal() {
    this.setState({ display: false });
  }

  editTeam(e) {
    e.preventDefault();

    axios.post('/api/edit_team', {
      event_id: this.state.event_id,
      skillsOwned: this.state.owned,
      skillsPrefered: this.state.preferred,
      skillsRequired: this.state.required,
      projectName: this.state.projectName,
      projectPlan: this.state.plan,
    })
      .then((response) => {
        // console.log(response);
        // console.log(response.data.success);

        if (response.data.success) {
          this.props.history.push(`/team/${this.state.event_id}`);
          this.hideModal();
        } else {
          // eslint-disable-next-line no-undef
          alert(response.data.message); // eslint-disable-line no-alert
        }
      })
      .catch((error) => {
        console.log(error); // eslint-disable-line no-console
      });
  }

  matchTeam() {
    this.props.history.push(`/matches/${this.state.event_id}`);
  }

  render() {
    const members = this.state.members.map(member => (
      <Row key={member._id}>
        <p>{member.profile.name}</p>
      </Row>
    ));

    return (
      <div className="TeamView" >
        <div className="BackgroundImg">
          <img src={Background} alt="" style={{ height: '100%', width: '100%' }} />
        </div >
        <h1 style={{ zIndex: '2' }}>{this.state.event}: Team Board</h1>
        <br />
        <Grid style={{ zIndex: '2' }}>
          <Col xs={12} md={8}>
            <Row>
              <Panel collapsible defaultExpanded header="Skills" bsStyle="primary" >
                <ListGroup fill>
                  <ListGroupItem>
                    <SkillsList skills={this.state.owned} title="Skills You Have: " />
                  </ListGroupItem>
                  <ListGroupItem>
                    <SkillsList skills={this.state.required} title="Skills You Require: " />
                  </ListGroupItem>
                  <ListGroupItem>
                    <SkillsList skills={this.state.preferred} title="Skills You Prefer: " />
                  </ListGroupItem>
                </ListGroup>
              </Panel>
              <Panel
                collapsible
                defaultExpanded
                header="Project Plan"
                bsStyle="primary"
                eventKey="2"
              >
                <ListGroup fill>
                  <ListGroupItem>
                    {this.state.projectName}
                  </ListGroupItem>
                  <ListGroupItem>
                    {this.state.plan}
                  </ListGroupItem>
                </ListGroup>
              </Panel>
            </Row>
          </Col>
          <Col xs={6} md={4}>
            <Panel collapsible defaultExpanded header="Members" bsStyle="primary">
              <ListGroup fill>
                <ListGroupItem>
                  {members}
                </ListGroupItem>
                <ListGroupItem>
                  <ButtonToolbar>
                    <Button
                      bsStyle="info"
                      bsSize="large"
                      block
                      onClick={this.matchTeam}
                    >
                      Find Match
                    </Button>
                    <Button
                      bsStyle="info"
                      bsSize="large"
                      block
                      onClick={this.showModal}
                    >
                      Edit
                    </Button>
                    <Button bsStyle="danger" bsSize="large" block>Leave</Button>
                  </ButtonToolbar>
                </ListGroupItem>
              </ListGroup>
            </Panel>
          </Col>
        </Grid>

        <Modal show={this.state.display} onHide={this.hideModal}>
          <Modal.Header>
            <Modal.Title>Edit Team</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form inline>
              <SelectSkills
                title="Skills You Have"
                changeCheckbox={this.changeCheckbox}
                list={this.state.owned}
              />
              <br />
              <br />
              <SelectSkills
                title="Skills You Require"
                changeCheckbox={this.changeCheckbox}
                list={this.state.required}
              />
              <br />
              <br />
              <SelectSkills
                title="Skills You Prefer"
                changeCheckbox={this.changeCheckbox}
                list={this.state.preferred}
              />
              <br />
              <br />
              <ControlLabel>Your Project Name</ControlLabel>
              <br />
              <FormControl
                type="Project Name"
                value={this.state.projectName}
                placeholder="Project Name"
                onChange={this.handleProjectNameChange}
              />
              <br />
              <br />
              <ControlLabel>Your Project Plan</ControlLabel>
              <br />
              <FormGroup controlId="formControlsTextarea">
                <FormControl
                  type="Project Plan"
                  value={this.state.plan}
                  onChange={this.handlePlanChange}
                  componentClass="textarea"
                  placeholder="textarea"
                />
              </FormGroup>

            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="success" onClick={this.editTeam}>
              Done
            </Button>

          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

TeamView.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(TeamView);
