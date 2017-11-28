import React, { Component } from 'react';
import axios from 'axios';

class Matching extends Component {
  constructor(props) {
    super(props);
    const value = new Date().toISOString();
    this.state = {
      team: "I'm a team",
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    const _this = this;
    console.log(this.props);
    let key = '';
    key = this.props.match.params.event;

    // Submit form via jQuery/AJAX
    // console.log(data);
    axios.post('/api/search_event', {
      query: key,
    })
      .then((response) => {
        // console.log(response.data);
        console.log(response.data.success);
        if (response.data.success) {
          const newState = response.data.events;
          for (let i = 0; i < newState.length; i++) {
            // reformatting dates
            let tokens = newState[i].start_date.split('T')[0].split('-');
            let formattedDate = `${tokens[1]}/${tokens[2]}/${tokens[0]}`;
            newState[i].start_date = formattedDate;

            tokens = newState[i].end_date.split('T')[0].split('-');
            formattedDate = `${tokens[1]}/${tokens[2]}/${tokens[0]}`;
            newState[i].end_date = formattedDate;

            tokens = newState[i].registration_deadline.split('T')[0].split('-');
            formattedDate = `${tokens[1]}/${tokens[2]}/${tokens[0]}`;
            newState[i].registration_deadline = formattedDate;
          }
          _this.setState({ events: newState });
        } else {
          console.log('team query failed');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="Matching" >
      
      </div>
    );
  }
}

export default Matching;