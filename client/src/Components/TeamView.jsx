import React, { Component } from 'react';
import { Col, Row, Grid, Button, Panel, Checkbox, FormGroup, ControlLabel, Modal, ListGroup, Form, FormControl, ListGroupItem, ButtonToolbar } from 'react-bootstrap';
import axios from 'axios';
import SelectSkills from './SelectSkills';

class TeamView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeKey: 1,
      owned: [],
      required: [],
      preferred: [],
      projectName: '',
      plan: '',
      display: false,
      selectedEvent: '',
    };

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.changeCheckbox = this.changeCheckbox.bind(this);
    this.handleProjectNameChange = this.handleProjectNameChange.bind(this);
    this.handlePlanChange = this.handlePlanChange.bind(this);
  }

  componentDidMount() {
    axios.post('/api/view_team', {
      query: key,
    })
      .then((response) => {
  }

  changeCheckbox(e, title) {
    //console.log(e);
    if (e.target.checked === true) {
      if (title === "Skills You Have") {
        this.state.owned.push(e.target.value)
      } else if (title === "Skills You Require") {
        this.state.required.push(e.target.value)
      } else if (title === "Skills You Prefer") {
        this.state.preferred.push(e.target.value)
      }
    } else {
      if (title === "Skills You Have") {
        let index = this.state.owned.indexOf(e.target.value);
        if (index > -1) {
          this.state.owned.splice(index, 1);
        }
      } else if (title === "Skills You Require") {
        let index = this.state.required.indexOf(e.target.value);
        if (index > -1) {
          this.state.required.splice(index, 1);
        }
      } else if (title === "Skills You Prefer") {
        let index = this.state.preferred.indexOf(e.target.value);
        if (index > -1) {
          this.state.preferred.splice(index, 1);
        }
      }
    }
    console.log(this.state.owned);
    console.log(this.state.required);
    console.log(this.state.preferred);

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
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
    })
      .then((response) => {
        console.log(response);
        console.log(response.data.success);
        console.log(response.data.user);

        if (response.data.success) {
          this.props.history.push('/create_profile');
        } else {
          alert('Account already exists');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
    <div className="TeamView" >
      {<h1>Team Board</h1>}
      <br/>
      <Grid>
        <Col xs={12} md={8}>
          <Row>
            <Panel collapsible defaultExpanded header="Skills" bsStyle="success" >
              <ListGroup fill>
                <ListGroupItem>Filter</ListGroupItem>
                <ListGroupItem>Required</ListGroupItem>
                <ListGroupItem>Preferred</ListGroupItem>
              </ListGroup>
            </Panel>
            <Panel collapsible defaultExpanded header="Project Plan" bsStyle="success" eventKey="2">
              <ListGroup fill>
                <ListGroupItem>
                  Name
                </ListGroupItem>
                <ListGroupItem>
                  Description
                </ListGroupItem>
              </ListGroup>
            </Panel>
          </Row>
        </Col>
        <Col xs={6} md={4}>
          <Panel collapsible defaultExpanded header="Members" bsStyle="success">
            <ListGroup fill>
              <ListGroupItem>
                <p>member list</p>
              </ListGroupItem>
              <ListGroupItem>
                <ButtonToolbar>
                  <Button bsStyle="primary" bsSize="large" block>Find Match</Button>
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
            <SelectSkills title="Skills You Have" changeCheckbox={this.changeCheckbox}/>
            <br />
            <br />
            <SelectSkills title="Skills You Require" changeCheckbox={this.changeCheckbox}/>
            <br />
            <br />
            <SelectSkills title="Skills You Prefer" changeCheckbox={this.changeCheckbox}/>
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
export default TeamView;
