import React, { Component } from 'react';
import { Col, Row, Grid, Button, Panel, Jumbotron } from 'react-bootstrap';
import axios from 'axios';

class Matching extends Component {
  constructor(props) {
    super(props);
    const value = new Date().toISOString();
    this.state = {
      team: 'Foo Fighters',
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
      <div className="Matching">
        <Jumbotron>
          <Grid>
            <Row className="show-grid">
              <Col md={3}><Button bsStyle="danger" onClick={this.reject}>Reject</Button></Col>
              <Col md={5}>
                <Panel header="A Team" bsStyle="info">
                  {this.state.team}
                </Panel>
              </Col>
              <Col md={3}><Button bsStyle="success" onClick={this.accept}>Accept</Button></Col>
            </Row>
          </Grid>
        </Jumbotron>
      </div>
    );
  }
}

export default Matching;
