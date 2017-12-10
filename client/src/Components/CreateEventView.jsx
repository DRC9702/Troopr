import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Panel, ControlLabel, FormControl, Button, FormGroup, HelpBlock, Row, Col, Glyphicon } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';
import DatePicker from '../react-bootstrap-date-picker'; // eslint-disable-line import/no-extraneous-dependencies


require('../styles/CreateEventView.css');

class CreateEventView extends Component {
  constructor(props) {
    super(props);
    const curDate = new Date().toISOString();
    const tokens = curDate.split('/')[0].split('-');
    const formattedDate = `${tokens[1]}/${tokens[2]}/${tokens[0]}`;
    this.state = {
      startDate: curDate,
      deadline: curDate,
      endDate: curDate,
      formattedStartValue: formattedDate,
      formattedDeadline: formattedDate,
      formattedEndValue: formattedDate,
      eventName: '',
      minSize: '',
      maxSize: '',
      eventBio: '',
    };

    this.createEvent = this.createEvent.bind(this);
    this.handleEventNameChange = this.handleEventNameChange.bind(this);
    this.handleMinSizeChange = this.handleMinSizeChange.bind(this);
    this.handleMaxSizeChange = this.handleMaxSizeChange.bind(this);
    this.handleEventBioChange = this.handleEventBioChange.bind(this);
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleDeadlineChange = this.handleDeadlineChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
  }

  handleEventNameChange(e) {
    this.setState({ eventName: e.target.value });
  }

  handleMinSizeChange(e) {
    this.setState({ minSize: e.target.value });
  }

  handleMaxSizeChange(e) {
    this.setState({ maxSize: e.target.value });
  }

  handleEventBioChange(e) {
    this.setState({ eventBio: e.target.value });
  }

  handleStartChange(value, formattedValue) {
    this.setState({
      startDate: value, // ISO String, ex: "2016-11-19T12:00:00.000Z"
      formattedStartValue: formattedValue, // Formatted String, ex: "11/19/2016"
    });
  }

  handleDeadlineChange(value, formattedValue) {
    this.setState({
      deadline: value, // ISO String, ex: "2016-11-19T12:00:00.000Z"
      formattedDeadline: formattedValue, // Formatted String, ex: "11/19/2016"
    });
  }

  handleEndChange(value, formattedValue) {
    this.setState({
      endDate: value, // ISO String, ex: "2016-11-19T12:00:00.000Z"
      formattedEndValue: formattedValue, // Formatted String, ex: "11/19/2016"
    });
  }

  createEvent(e) {
    e.preventDefault();
    // Submit form via jQuery/AJAX
    // console.log(data);
    if (this.state.minSize > this.state.maxSize) {
      alert('Minimum and Maximum Size Error'); // eslint-disable-line
    } else {
      axios.post('/api/create_event', {
        event_name: this.state.eventName,
        start_date: this.state.formattedStartValue,
        registration_deadline: this.state.formattedDeadline,
        end_date: this.state.formattedEndValue,
        min: this.state.minSize,
        max: this.state.maxSize,
        description: this.state.eventBio,
      }).then((response) => {
        // console.log(response);
        // console.log(response.data.success);
        // console.log(response.data.user);

        if (response.data.success) {
          this.props.history.push('/events/$all');
        } else if (response.data.message) {
          alert(response.data.message); // eslint-disable-line
        } else {
          alert('event created failed'); // eslint-disable-line
        }
      }).catch((error) => {
        console.log(error); // eslint-disable-line no-console
      });
    }
  }

  render() {
    return (
      <div className="CreateEventView">
        <h1>Create Event</h1>
        <Panel header="Info" bsStyle="success" style={{ width: '75%', margin: '20px' }}>
          <FieldGroup
            id="formControlsText"
            label="Event Name"
            type="text"
            placeholder="Event Name"
            value={this.state.eventName}
            onChange={this.handleEventNameChange}
          />
          <Row className="show-grid" style={{ width: '100%' }}>
            <Col sm={4}>
              <FormGroup validationState="success">
                <ControlLabel>Starting Date</ControlLabel>
                <DatePicker
                  id="startDate"
                  value={this.state.startDate}
                  onChange={this.handleStartChange}
                  Styles="Success"
                  clearButtonElement={<Glyphicon glyph="star" />}
                />
              </FormGroup>
            </Col>

            <Col sm={4}>
              <FormGroup validationState="success">
                <ControlLabel>Closing Date</ControlLabel>
                <DatePicker
                  id="endDate"
                  value={this.state.endDate}
                  onChange={this.handleEndChange}
                  Styles="Success"
                  clearButtonElement={<Glyphicon glyph="star" />}
                />
              </FormGroup>
            </Col>

            <Col sm={4}>
              <FormGroup validationState="success">
                <ControlLabel>Registration Deadline</ControlLabel>
                <DatePicker
                  id="deadline"
                  value={this.state.deadline}
                  onChange={this.handleDeadlineChange}
                  Styles="Success"
                  clearButtonElement={<Glyphicon glyph="star" />}
                />
              </FormGroup>
            </Col>
          </Row>

          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Min Team Size</ControlLabel>
            <FormControl
              componentClass="select"
              placeholder="select"
              value={this.state.minSize}
              onChange={this.handleMinSizeChange}
            >
              <option value="select">select</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </FormControl>
          </FormGroup>

          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Max Team Size</ControlLabel>
            <FormControl
              componentClass="select"
              placeholder="select"
              value={this.state.maxSize}
              onChange={this.handleMaxSizeChange}
            >
              <option value="select">select</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </FormControl>
          </FormGroup>

          <FormGroup controlId="formControlsTextarea">
            <ControlLabel >Event Description</ControlLabel>
            <FormControl
              componentClass="textarea"
              placeholder="textarea"
              bsSize="large"
              value={this.state.eventBio}
              onChange={this.handleEventBioChange}
            />
          </FormGroup>
        </Panel>
        <Button bsStyle="success" type="submit" onClick={this.createEvent}>
            Create
        </Button>
      </div>
    );
  }
}

CreateEventView.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

// eslint-disable-next-line object-curly-newline
function FieldGroup({ id, label, help, ...props }) { // eslint-disable-line react/prop-types
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

export default withRouter(CreateEventView);
