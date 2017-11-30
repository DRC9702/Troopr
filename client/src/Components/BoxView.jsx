import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';

// require('../styles/SideView.css');

class BoxView extends Component {



  render() {
    return (
      <div className="BoxView">
        <Panel header={this.props.title} bsStyle="primary">
        <ListGroup>
          <ListGroupItem href="#">Link 1</ListGroupItem>
          <ListGroupItem href="#">Link 2</ListGroupItem>
          <ListGroupItem href="#">Link 3</ListGroupItem>
        </ListGroup>
        </Panel>
      </div>
    );
  }
}

BoxView.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default BoxView;
