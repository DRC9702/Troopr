import React, { Component } from 'react';
import {ControlLabel, FormControl, Button, FormGroup, HelpBlock, Col} from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';

class CreateEventView extends Component {


    constructor(props) {
        super(props);
        // this.state = {
        //     date: "1990-06-05",
        //     format: "YYYY-MM-DD",
        //     inputFormat: "DD/MM/YYYY",
        //     mode: "date"
        // };
        var value = new Date().toISOString();
        this.state = {
            startDate: value,
            deadline: value,
            endDate: value
        }
    };

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

    // handleChange =(e) =>{
    //     console.log(e);
    //     var  k = "startDate"
    //     this.setState({k: e
    //     });
    // }

    render() {
        return (
            <div className="CreateEventView" style={styles}>
                <br/><br/><br/><br/>
                {/*<form>*/}
                    {/*<br/><br/><br/><br/>*/}
                    <FieldGroup
                        id="formControlsText"
                        type="text"
                        label="Event Name"

                        placeholder="Event Name"
                    />

                    <FieldGroup
                        id="formControlText"
                        label="Starting Date"
                        type="text"
                        placeholder="Event Starting Date"
                    />

                    <Col sm={3}>
                        <FormGroup validationState="success">
                            <ControlLabel>Starting Date</ControlLabel>
                            <DatePicker id="startDate" value={this.state.startDate} onChange={this.handleStartChange} Styles="Success"/>
                        </FormGroup>
                    </Col>

                    <Col sm={3}>
                        <FormGroup validationState="success">
                            <ControlLabel>Closing Date</ControlLabel>
                            <DatePicker id="endDate" value={this.state.deadline} onChange={this.handleDeadlineChange} Styles="Success"/>
                        </FormGroup>
                    </Col>

                    <Col sm={3}>
                        <FormGroup validationState="success">
                            <ControlLabel>Registration Deadline</ControlLabel>
                            <DatePicker id="deadline" value={this.state.endDate} onChange={this.handleEndChange}  Styles="Success"/>
                        </FormGroup>
                    </Col>

                    <FormGroup controlId="formControlsSelect">
                        <ControlLabel>Min Team Size</ControlLabel>
                        <FormControl componentClass="select" placeholder="select">
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
                        <FormControl componentClass="select" placeholder="select">
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
                        <FormControl componentClass="textarea" placeholder="textarea" bsSize="large"/>
                    </FormGroup>

                    {/*<Button type="submit" bsStyle='primary'>*/}
                        {/*Create*/}
                    {/*</Button>*/}
                {/*</form>*/}
                {/*<FieldGroup*/}
                    {/*id="formControlsText"*/}
                    {/*type="text"*/}
                    {/*value={this.state.name}*/}
                    {/*label="Name"*/}
                    {/*onChange={this.handleNameChange}*/}
                    {/*placeholder="Enter Name"*/}
                {/*/>*/}

                {/*<FieldGroup*/}
                    {/*id="formControlsSkills"*/}
                    {/*type="text"*/}
                    {/*value={this.state.skills}*/}
                    {/*label="Skills"*/}
                    {/*onChange={this.handleSkillsChange}*/}
                    {/*placeholder="Enter skills"*/}
                {/*/>*/}

                {/*<FieldGroup*/}
                    {/*id="formControlsFile"*/}
                    {/*type="text"*/}
                    {/*value={this.state.resume}*/}
                    {/*label="Resume"*/}
                    {/*onChange={this.handleResumeChange}*/}
                    {/*placeholder="Enter Resume"*/}
                {/*/>*/}

                {/*<FormGroup controlId="formControlsTextarea">*/}
                    {/*<ControlLabel>Bio</ControlLabel>*/}
                    {/*<FormControl componentClass="textarea"*/}
                                 {/*value={this.state.bio}*/}
                                 {/*onChange={this.handleBioChange}*/}

                                 {/*placeholder="textarea" />*/}
                {/*</FormGroup>*/}

                <Button type="submit" onClick={this.create_profile}>
                    Submit
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


