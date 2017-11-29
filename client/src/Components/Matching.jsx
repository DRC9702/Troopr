import React, { Component } from 'react';
import { Col, Row, Grid, Button, Panel, Jumbotron, PageHeader } from 'react-bootstrap';
import axios from 'axios';
import SkillsList from './SkillsList';

const styles = {
  backgroundColor: '',
  height: '400px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignItems: 'center',
  flexWrap: 'wrap',
};

class Matching extends Component {
  constructor(props) {
    super(props);
    const value = new Date().toISOString();
    this.state = {
      team: 'Foo Fighters',
      skillsOffered: ['html', 'css'],
      skillsWanted: ['node.js'],
      members: ['Dave', 'Victor'],

    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.reject = this.reject.bind(this);
    this.accept = this.accept.bind(this);
  }

  componentDidMount() {
    const _this = this;
    console.log(this.props);
    let key = '';
    key = this.props.match.params.event;
    // Submit form via jQuery/AJAX
  }

  reject(e) {
    alert(`Team ${  this.state.team  } rejected`);
    // get new team from jQuery/AJAX; reject
    this.setState({ team: 'Better' });
  }

  accept(e) {
    alert(`Team ${  this.state.team  } <3`);
    this.setState({ team: 'Another option' });
    // tell jQuery/AJAX team is formed; accept
  }

  render() {
    return (
      <div className="Matching" style={styles}>
        <h1 style={{ color: 'grey' }} >Matching you with teams in {this.props.match.params.event} ...</h1>
        <Grid>
          <Row className="show-grid">
            <Col md={3}><Button bsStyle="danger" bsSize="large" onClick={this.reject}>Reject</Button></Col>
            <Col md={5}>
              <Panel header={this.state.team}>
                <SkillsList skills={this.state.skillsOffered} title="Skills: " />
                <SkillsList skills={this.state.skillsWanted} title="Skills Wanted: " />
                <SkillsList skills={this.state.members} title="Members: " />
              </Panel>
            </Col>
            <Col md={3}><Button bsStyle="success" bsSize="large" onClick={this.accept}>Accept</Button></Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Matching;
