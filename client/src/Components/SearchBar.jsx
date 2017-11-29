import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { ControlLabel, FormControl, Button, FormGroup, HelpBlock } from 'react-bootstrap';


class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            query: '',
        };
        this.searchEvent = this.searchEvent.bind(this);
    }

    searchEvent = function(e) {
        e.preventDefault();
        axios.post('/api/search_event', {
            query: this.state.query,
        })
            .then((response) => {
                console.log(response);
                console.log(response.data.success);
                // console.log(response.data.user);

                if (response.data.success) {
                  this.props.history.push("/events/" +  this.state.query);
                }
                // } else {
                //     if(response.data.message){
                //         alert(response.data.message);
                //     }else{
                //         alert('event created failed');
                //     }
                // }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleChange = function(e) {
        this.setState({ query: e.target.query });
    }.bind(this);

  render() {
    return (
      <div className="SearchBar" style={styles}>
        <form style={styles}>
	        <input
	          type="text"
	          placeholder="Search..."
	          value={this.props.filterText}
	          ref="filterTextInput"
	          onChange={this.handleChange}
	        />
            <Button type="submit" value="Search" onClick={this.searchEvent}>
                Search Event
            </Button>
      	</form>
      </div>
    );
  }
}

const styles = {
    backgroundColor: 'blue',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
};

export default withRouter(SearchBar);
