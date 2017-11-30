import React, { Component } from 'react';
import { Checkbox, FormGroup, ControlLabel } from 'react-bootstrap';
import PropTypes from 'prop-types';


class SelectSkills extends Component {
  constructor(props) {
    super(props);
    this.state = { referencePropsList: (props.list != null) };
    this.isChecked = this.isChecked.bind(this);
    this.changeCheck = this.changeCheck.bind(this);
    this.clickChecck = this.clickCheck.bind(this);
  }

  shouldComponentUpdate() {
    return this.state.referencePropsList;
  }

  isChecked(value) {
    if (this.state.referencePropsList) {
      return this.props.list.indexOf(value) >= 0;
    }
    return null;
  }

  changeCheck(e, title) {
    if (!this.state.referencePropsList) {
      // console.log('Doing onChange');
      this.props.changeCheckbox(e, title);
    }
  }

  clickCheck(e, title) {
    if (this.state.referencePropsList) {
      // console.log('Doing onClick');
      this.props.changeCheckbox(e, title);
    }
  }

  render() {
    // console.log(this.state.referencePropsList);
    // console.log(this.props.list);
    return (
      <FormGroup>
        <ControlLabel>{ this.props.title }</ControlLabel>
        <br />
        <Checkbox inline value="Java" onClick={e => this.clickCheck(e, this.props.title)} onChange={e => this.changeCheck(e, this.props.title)} checked={this.isChecked('Java')}>
          Java
        </Checkbox>
        {' '}
        <Checkbox inline value="Python" onClick={e => this.clickCheck(e, this.props.title)} onChange={e => this.changeCheck(e, this.props.title)} checked={this.isChecked('Python')}>
          Python
        </Checkbox>
        {' '}
        <Checkbox inline value="JavaScript" onClick={e => this.clickCheck(e, this.props.title)} onChange={e => this.changeCheck(e, this.props.title)} checked={this.isChecked('JavaScript')}>
          JavaScript
        </Checkbox>
        {' '}
        <Checkbox inline value="C" onClick={e => this.clickCheck(e, this.props.title)} onChange={e => this.changeCheck(e, this.props.title)} checked={this.isChecked('C')}>
          C
        </Checkbox>
        {' '}
        <Checkbox inline value="C++" onClick={e => this.clickCheck(e, this.props.title)} onChange={e => this.changeCheck(e, this.props.title)} checked={this.isChecked('C++')}>
          C++
        </Checkbox>
        {' '}
        <Checkbox inline value="SQL" onClick={e => this.clickCheck(e, this.props.title)} onChange={e => this.changeCheck(e, this.props.title)} checked={this.isChecked('SQL')}>
          SQL
        </Checkbox>
        {' '}
        <Checkbox inline value="OCaml" onClick={e => this.clickCheck(e, this.props.title)} onChange={e => this.changeCheck(e, this.props.title)} checked={this.isChecked('OCaml')}>
          OCaml
        </Checkbox>
        {' '}
        <Checkbox inline value="Go" onClick={e => this.clickCheck(e, this.props.title)} onChange={e => this.changeCheck(e, this.props.title)} checked={this.isChecked('Go')}>
          Go
        </Checkbox>
        {' '}
        <Checkbox inline value="Perl" onClick={e => this.clickCheck(e, this.props.title)} onChange={e => this.changeCheck(e, this.props.title)} checked={this.isChecked('Perl')}>
          Perl
        </Checkbox>
        {' '}
        <Checkbox inline value="PHP" onClick={e => this.clickCheck(e, this.props.title)} onChange={e => this.changeCheck(e, this.props.title)} checked={this.isChecked('PHP')}>
          PHP
        </Checkbox>
        {' '}
        <Checkbox inline value="ML" onClick={e => this.clickCheck(e, this.props.title)} onChange={e => this.changeCheck(e, this.props.title)} checked={this.isChecked('ML')}>
          Machine Learning
        </Checkbox>
        {' '}
        <Checkbox inline value="iOS" onClick={e => this.clickCheck(e, this.props.title)} onChange={e => this.changeCheck(e, this.props.title)} checked={this.isChecked('iOS')}>
          iOS
        </Checkbox>
        {' '}
        <Checkbox inline value="Android" onClick={e => this.clickCheck(e, this.props.title)} onChange={e => this.changeCheck(e, this.props.title)} checked={this.isChecked('Android')}>
          Android
        </Checkbox>
        {' '}
        <Checkbox inline value="UI" onClick={e => this.clickCheck(e, this.props.title)} onChange={e => this.changeCheck(e, this.props.title)} checked={this.isChecked('UI')}>
          UI
        </Checkbox>
        {' '}
        <Checkbox inline value="Ruby" onClick={e => this.clickCheck(e, this.props.title)} onChange={e => this.changeCheck(e, this.props.title)} checked={this.isChecked('Ruby')}>
          Ruby
        </Checkbox>
        {' '}
        <Checkbox inline value="Matlab" onClick={e => this.clickCheck(e, this.props.title)} onChange={e => this.changeCheck(e, this.props.title)} checked={this.isChecked('Matlab')}>
          Matlab
        </Checkbox>
        {' '}
        <Checkbox inline value="NoSQL" onClick={e => this.clickCheck(e, this.props.title)} onChange={e => this.changeCheck(e, this.props.title)} checked={this.isChecked('NoSQL')}>
          NoSQL
        </Checkbox>
      </FormGroup>
    );
  }
}

SelectSkills.propTypes = {
  list: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  changeCheckbox: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

SelectSkills.defaultProps = {
  list: null,
};

export default SelectSkills;
