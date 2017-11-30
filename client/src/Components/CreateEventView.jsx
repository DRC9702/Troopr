import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Panel, ControlLabel, FormControl, Button, FormGroup, HelpBlock, Row, Col, Glyphicon} from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';
import axios from 'axios';

require('../styles/CreateEventView.css');

class CreateEventView extends Component {

    constructor(props) {
        super(props);
        const curDate = new Date().toISOString();
        var tokens = curDate.split("/")[0].split("-");
        const formattedDate = tokens[1] + "/" + tokens[2] + "/" + tokens[0];
        this.state = {
            startDate: curDate,
            deadline: curDate,
            endDate: curDate,
            formattedStartValue: formattedDate,
            formattedDeadline: formattedDate,
            formattedEndValue: formattedDate,
            eventName: "",
            minSize: "",
            maxSize: "",
            eventBio: "",
        };

        this.createEvent = this.createEvent.bind(this);
    };

    handleEventNameChange = function(e) {
        this.setState({ eventName: e.target.value });
    }.bind(this);

    handleMinSizeChange = function(e) {
        this.setState({ minSize: e.target.value });
    }.bind(this);

    handleMaxSizeChange = function(e) {
        this.setState({ maxSize: e.target.value });
    }.bind(this);

    handleEventBioChange = function(e) {
        this.setState({ eventBio: e.target.value });
    }.bind(this);

    handleStartChange = function(value, formattedValue) {
        this.setState({
            startDate: value, // ISO String, ex: "2016-11-19T12:00:00.000Z"
            formattedStartValue: formattedValue // Formatted String, ex: "11/19/2016"
        });
    }.bind(this);

    handleDeadlineChange = function(value, formattedValue) {
        this.setState({
            deadline: value, // ISO String, ex: "2016-11-19T12:00:00.000Z"
            formattedDeadline: formattedValue // Formatted String, ex: "11/19/2016"
        });
    }.bind(this);

    handleEndChange = function(value, formattedValue) {
        this.setState({
            endDate: value, // ISO String, ex: "2016-11-19T12:00:00.000Z"
            formattedEndValue: formattedValue // Formatted String, ex: "11/19/2016"
        });
    }.bind(this);

    createEvent = function(e) {

        e.preventDefault();

        // Submit form via jQuery/AJAX
        //console.log(data);
        axios.post('/api/create_event', {
            event_name: this.state.eventName,
            start_date: this.state.formattedStartValue,
            registration_deadline: this.state.formattedDeadline,
            end_date: this.state.formattedEndValue,
            min: this.state.minSize,
            max: this.state.maxSize,
            description: this.state.eventBio,
        })
        .then((response) => {
            console.log(response);
            console.log(response.data.success);
            // console.log(response.data.user);

            if (response.data.success) {
                this.props.history.push('/events/$all');
            } else {
                if(response.data.message){
                    alert(response.data.message);
                }else{
                    alert('event created failed');
                }
            }
        })
        .catch((error) => {
            console.log(error);
        });
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
                          <DatePicker id="startDate" value={this.state.startDate} onChange={this.handleStartChange}
                                      Styles="Success" clearButtonElement={<Glyphicon glyph="star" />}/>
                      </FormGroup>
                  </Col>

                  <Col sm={4}>
                      <FormGroup validationState="success">
                          <ControlLabel>Closing Date</ControlLabel>
                          <DatePicker id="endDate" value={this.state.endDate} onChange={this.handleEndChange}
                                      Styles="Success" clearButtonElement={<Glyphicon glyph="star" />}/>
                      </FormGroup>
                  </Col>

                  <Col sm={4}>
                      <FormGroup validationState="success">
                          <ControlLabel>Registration Deadline</ControlLabel>
                          <DatePicker id="deadline" value={this.state.deadline} onChange={this.handleDeadlineChange}
                                      Styles="Success" clearButtonElement={<Glyphicon glyph="star" />}/>
                      </FormGroup>
                  </Col>
                </Row>

                <FormGroup controlId="formControlsSelect">
                    <ControlLabel>Min Team Size</ControlLabel>
                    <FormControl componentClass="select" placeholder="select" value={this.state.minSize}
                                  onChange={this.handleMinSizeChange}>
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
                    <FormControl componentClass="select" placeholder="select" value={this.state.maxSize}
                                  onChange={this.handleMaxSizeChange}>
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
                    <FormControl componentClass="textarea" placeholder="textarea" bsSize="large"
                                  value={this.state.eventBio} onChange={this.handleEventBioChange}/>
                </FormGroup>
              </Panel>
              <Button bsStyle="success" type="submit" onClick={this.createEvent}>
                  Create
              </Button>
          </div>
        );
    }
}

function FieldGroup({ id, label, help, ...props }) {
    return (
    <FormGroup controlId={id}>
    <ControlLabel>{label}</ControlLabel>
    <FormControl {...props} />
    {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
    );
}

export default withRouter(CreateEventView);


