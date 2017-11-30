import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import { Col, Row, Grid, Button, Panel, Checkbox, FormGroup, ControlLabel, Modal, ListGroup, Form, FormControl, ListGroupItem, ButtonToolbar } from 'react-bootstrap';
import axios from 'axios';
import SelectSkills from './SelectSkills';

class TeamView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      event_id: '',
      team_id: '',
      owned: [],
      required: [],
      preferred: [],
      projectName: '',
      members: [],
      plan: '',
      display: false,
      selectedEvent: '',
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
    const _this = this;
    console.log(this.props.match.params.event);
    console.log(typeof(this.props.match.params.event));

    let event_id = this.props.match.params.event;

    axios.post('/api/view_team', {
      event_id: event_id,
    })
      .then((response) => {
        console.log(response.data.success);
        if (response.data.success) {
          console.log(response.data.team);
          const team = response.data.team;
          this.setState({team_id: team._id});
          this.setState({event_id: team.event._id});
          this.setState({owned: team.skillsOwned});
          this.setState({required: team.skillsRequired});
          this.setState({preferred: team.skillsPrefered});
          this.setState({projectName: team.projectName});
          this.setState({plan: team.projectPlan});
          this.setState({members: team.members});
          console.log(team.projectPlan)
        } else {
          console.log('events query failed');
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  changeCheckbox(e, title) {
    //console.log(e);
    if (e.target.checked === true) {
      if (title === 'Skills You Have') {
        this.state.owned.push(e.target.value)
      } else if (title === 'Skills You Require') {
        this.state.required.push(e.target.value)
      } else if (title === 'Skills You Prefer') {
        this.state.preferred.push(e.target.value)
      }
    } else {
      if (title === 'Skills You Have') {
        let index = this.state.owned.indexOf(e.target.value);
        if (index > -1) {
          this.state.owned.splice(index, 1);
        }
      } else if (title === 'Skills You Require') {
        let index = this.state.required.indexOf(e.target.value);
        if (index > -1) {
          this.state.required.splice(index, 1);
        }
      } else if (title === 'Skills You Prefer') {
        let index = this.state.preferred.indexOf(e.target.value);
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
    this.setState({projectName: e.target.value})
    console.log(this.state.projectName);
  }

  handlePlanChange(e) {
    this.setState({plan: e.target.value})
    console.log(this.state.plan);
  }

  showModal() {
    this.setState({ display: true });
  }

  hideModal() {
    this.setState({ display: false });
  }

  editTeam(e) {
    e.preventDefault()

    axios.post('/api/edit_team', {
      event_id: this.state.event_id,
      skillsOwned: this.state.owned,
      skillsPrefered: this.state.preferred,
      skillsRequired: this.state.required,
      projectName: this.state.projectName,
      projectPlan: this.state.plan,
    })
      .then((response) => {
        console.log(response);
        console.log(response.data.success);

        if (response.data.success) {
          this.props.history.push('/team/' + this.state.event_id);
          this.hideModal();
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  matchTeam() {
    this.props.history.push('/matches/' + this.state.event_id);
  }

  render() {
    const members = this.state.members.map((member) => (
      <Row key={member._id}>
        <p>{member.profile.name}</p>
      </Row>
    ));

    return (
    <div className="TeamView" >
      {<h1>Team Board</h1>}
      <br/>
      <Grid>
        <Col xs={12} md={8}>
          <Row>
            <Panel collapsible defaultExpanded header="Skills" bsStyle="success" >
              <ListGroup fill>
                <ListGroupItem>{JSON.stringify(this.state.owned)}</ListGroupItem>
                <ListGroupItem>{JSON.stringify(this.state.required)}</ListGroupItem>
                <ListGroupItem>{JSON.stringify(this.state.preferred)}</ListGroupItem>
              </ListGroup>
            </Panel>
            <Panel collapsible defaultExpanded header="Project Plan" bsStyle="success" eventKey="2">
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
          <Panel collapsible defaultExpanded header="Members" bsStyle="success">
            <ListGroup fill>
              <ListGroupItem>
                {members}
              </ListGroupItem>
              <ListGroupItem>
                <ButtonToolbar>
                  <Button bsStyle="primary" bsSize="large" block onClick={this.matchTeam}>Find Match</Button>
                  <Button bsStyle="info" bsSize="large" block onClick={this.showModal}>Edit</Button>
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
            <SelectSkills title="Skills You Have" changeCheckbox={this.changeCheckbox} list={this.state.owned} />
            <br />
            <br />
            <SelectSkills title="Skills You Require" changeCheckbox={this.changeCheckbox} list={this.state.required} />
            <br />
            <br />
            <SelectSkills title="Skills You Prefer" changeCheckbox={this.changeCheckbox} list={this.state.preferred} />
            <br />
            <br />
            <ControlLabel>Your Project Name</ControlLabel><br/>
            <FormControl
              type="Project Name"
              value={this.state.projectName}
              placeholder="Project Name"
              onChange={this.handleProjectNameChange}
            />
            <br />
            <br />
            <ControlLabel>Your Project Plan</ControlLabel><br/>
            <FormGroup controlId="formControlsTextarea">
              <FormControl
                type="Project Plan"
                value={this.state.plan}
                onChange={this.handlePlanChange}
                componentClass="textarea"
                placeholder="textarea" />
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
export default withRouter(TeamView);
