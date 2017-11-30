import React, { Component } from 'react';
import { Col, Row, Grid, Button, Panel, Checkbox, FormGroup, ControlLabel, Modal, ListGroup, Form, FormControl, ListGroupItem, ButtonToolbar } from 'react-bootstrap';

class SelectSkills extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <FormGroup>
        <ControlLabel>{ this.props.title }</ControlLabel><br/>
          <Checkbox inline value="Java" onChange={e => this.props.changeCheckbox(e, this.props.title)}>
            Java
          </Checkbox>
          {' '}
          <Checkbox inline value="Python" onChange={e => this.props.changeCheckbox(e, this.props.title)}>
            Python
          </Checkbox>
          {' '}
          <Checkbox inline value="JavaScript" onChange={e => this.props.changeCheckbox(e, this.props.title)}>
            JavaScript
          </Checkbox>
          {' '}
          <Checkbox inline value="C" onChange={e => this.props.changeCheckbox(e, this.props.title)}>
            C
          </Checkbox>
          {' '}
          <Checkbox inline value="C++" onChange={e => this.props.changeCheckbox(e, this.props.title)}>
            C++
          </Checkbox>
          {' '}
          <Checkbox inline value="SQL" onChange={e => this.props.changeCheckbox(e, this.props.title)}>
            SQL
          </Checkbox>
          {' '}
          <Checkbox inline value="OCaml" onChange={e => this.props.changeCheckbox(e, this.props.title)}>
            OCaml
          </Checkbox>
          {' '}
          <Checkbox inline value="Go" onChange={e => this.props.changeCheckbox(e, this.props.title)}>
            Go
          </Checkbox>
          {' '}
          <Checkbox inline value="Perl" onChange={e => this.props.changeCheckbox(e, this.props.title)}>
            Perl
          </Checkbox>
          {' '}
          <Checkbox inline value="PHP" onChange={e => this.props.changeCheckbox(e, this.props.title)}>
            PHP
          </Checkbox>
          {' '}
          <Checkbox inline value="ML" onChange={e => this.props.changeCheckbox(e, this.props.title)}>
            Machine Learning
          </Checkbox>
          {' '}
          <Checkbox inline value="iOS" onChange={e => this.props.changeCheckbox(e, this.props.title)}>
            iOS
          </Checkbox>
          {' '}
          <Checkbox inline value="Android" onChange={e => this.props.changeCheckbox(e, this.props.title)}>
            Android
          </Checkbox>
          {' '}
          <Checkbox inline value="UI" onChange={e => this.props.changeCheckbox(e, this.props.title)}>
            UI
          </Checkbox>
          {' '}
          <Checkbox inline value="Ruby" onChange={e => this.props.changeCheckbox(e, this.props.title)}>
            Ruby
          </Checkbox>
          {' '}
          <Checkbox inline value="Matlab" onChange={e => this.props.changeCheckbox(e, this.props.title)}>
            Matlab
          </Checkbox>
          {' '}
          <Checkbox inline value="NoSQL" onChange={e => this.props.changeCheckbox(e, this.props.title)}>
            NoSQL
          </Checkbox>
      </FormGroup>
      );
  }


}

export default SelectSkills