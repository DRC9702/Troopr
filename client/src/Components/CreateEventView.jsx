import React, { Component } from 'react';
import {ControlLabel, FormControl, Button, FormGroup, HelpBlock, Col, Glyphicon} from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';
import axios from 'axios';

class CreateEventView extends Component {

    constructor(props) {
        super(props);
        const value = new Date().toISOString();
        this.state = {
            startDate: value,
            deadline: value,
            endDate: value,
            formattedStartValue: "",
            formattedDeadline: "",
            formattedEndValue: "",
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

        //console.log(this.state);
        const data = {
            evenName: this.state.eventName,
            startDate: this.state.formattedStartValue,
            deadline: this.state.formattedDeadline,
            endDate: this.state.formattedEndValue,
            minSize: this.state.minSize,
            maxSize: this.state.maxSize,
            eventBio: this.state.eventBio,
        };

        // Submit form via jQuery/AJAX
        console.log(data);
        axios.post('/api/create_event', {
            evenName: this.state.eventName,
            startDate: this.state.formattedStartValue,
            deadline: this.state.formattedDeadline,
            endDate: this.state.formattedEndValue,
            minSize: this.state.minSize,
            maxSize: this.state.maxSize,
            eventBio: this.state.eventBio,
        })
        .then((response) => {
            console.log(response);
            console.log(response.data.success);
            console.log(response.data.user);

            if (response.data.success) {
                window.location = '/create_event';
            } else {
                alert('event created failed');
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <div className="CreateEventView" style={styles}>
                <br/><br/><br/><br/>
                    <FieldGroup
                        id="formControlsText"
                        label="Event Name"
                        type="text"
                        placeholder="Event Name"
                        value={this.state.eventName}
                        onChange={this.handleEventNameChange}
                    />

                    <Col sm={3}>
                        <FormGroup validationState="success">
                            <ControlLabel>Starting Date</ControlLabel>
                            <DatePicker id="startDate" value={this.state.startDate} onChange={this.handleStartChange}
                                        Styles="Success" clearButtonElement={<Glyphicon glyph="star" />}/>
                        </FormGroup>
                    </Col>

                    <Col sm={3}>
                        <FormGroup validationState="success">
                            <ControlLabel>Closing Date</ControlLabel>
                            <DatePicker id="endDate" value={this.state.deadline} onChange={this.handleDeadlineChange}
                                        Styles="Success" clearButtonElement={<Glyphicon glyph="star" />}/>
                        </FormGroup>
                    </Col>

                    <Col sm={3}>
                        <FormGroup validationState="success">
                            <ControlLabel>Registration Deadline</ControlLabel>
                            <DatePicker id="deadline" value={this.state.endDate} onChange={this.handleEndChange}
                                        Styles="Success" clearButtonElement={<Glyphicon glyph="star" />}/>
                        </FormGroup>
                    </Col>

                    <FormGroup controlId="formControlsSelect">
                        <ControlLabel>Min Team Size</ControlLabel>
                        <FormControl componentClass="select" placeholder="select" value={this.state.minSize}
                                     onChange={this.handleMinSizeChange}>
                            <option value="select">select</option>
                            <option value="other">2</option>
                            <option value="other">3</option>
                            <option value="other">4</option>
                            <option value="other">5</option>
                            <option value="other">6</option>
                            <option value="other">7</option>
                            <option value="other">8</option>
                            <option value="other">9</option>
                            <option value="other">10</option>
                        </FormControl>
                    </FormGroup>

                    <FormGroup controlId="formControlsSelect">
                        <ControlLabel>Max Team Size</ControlLabel>
                        <FormControl componentClass="select" placeholder="select" value={this.state.maxSize}
                                     onChange={this.handleMaxSizeChange}>
                            <option value="select">select</option>
                            <option value="other">2</option>
                            <option value="other">3</option>
                            <option value="other">4</option>
                            <option value="other">5</option>
                            <option value="other">6</option>
                            <option value="other">7</option>
                            <option value="other">8</option>
                            <option value="other">9</option>
                            <option value="other">10</option>
                        </FormControl>
                    </FormGroup>

                    <FormGroup controlId="formControlsTextarea">
                        <ControlLabel >Event Description</ControlLabel>
                        <FormControl componentClass="textarea" placeholder="textarea" bsSize="large"
                                     value={this.state.eventBio} onChange={this.handleEventBioChange}/>
                    </FormGroup>

                <Button bsStyle="success" type="submit" onClick={this.createEvent}>
                    Create
                </Button>
            </div>
        );
    }
}

const styles = {
    backgroundColor: 'orange',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexGrow: 1,
};


function FieldGroup({ id, label, help, ...props }) {
    return (
    <FormGroup controlId={id}>
    <ControlLabel>{label}</ControlLabel>
    <FormControl {...props} />
    {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
    );
}

export default CreateEventView;


