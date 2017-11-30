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
    const value = new Date().toISOString();
    this.state = {
      team: 'Foo Fighters',
      skillsOffered: ['html', 'css'],
      skillsWanted: ['node.js'],
      members: ['Dave', 'Victor'],
      show: false,

    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.reject = this.reject.bind(this);
    this.accept = this.accept.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  componentDidMount() {
    const _this = this;
    console.log(this.props);
    let key = '';
    key = this.props.match.params.event;
    // Submit form via jQuery/AJAX
  }

  reject() {
    alert(`Team ${  this.state.team  } rejected`);
    // get new team from jQuery/AJAX; reject
    this.setState({ team: 'Better' });
    this.showModal();
  }

  accept() {
    alert(`Team ${  this.state.team  } <3`);
    this.setState({ team: 'Another option' });
    // tell jQuery/AJAX team is formed; accept
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
            <Col md={3}><Button bsStyle="danger" bsSize="large" onClick={this.reject}>Reject</Button></Col>
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
            <Col md={3}><Button bsStyle="success" bsSize="large" onClick={this.accept}>Accept</Button></Col>
          </Row>
        </Grid>

        <Modal show={this.state.show} onHide={this.hideModal}>
          <Modal.Body>
            <h1>Oops! No matching teams are available.</h1>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="success">
              Leave Group
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

Matching.propTypes = { 
  // match: PropTypes.object.isRequired,
};

export default Matching;
