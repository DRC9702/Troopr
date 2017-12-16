import React from 'react';
import ReactDOM from 'react-dom';
import BoxView from '../Components/BoxView';


it('renders teams without crashing', () => {
  const title = 'Teams';
  const teams = [{ _id: 1, event: { _id: 1, name: 'test' } }];
  const div = document.createElement('div');
  ReactDOM.render(<BoxView title={title} teams={teams} />, div);
});

it('renders hosts without crashing', () => {
  const title = 'Events Hosted';
  const events = [{
    _id: 1, startDate: '12/12/12', endDate: '12/12/12', registrationDeadline: '12/12/12', teams: [1, 2], max: 3, min: 3,
  }];
  const div = document.createElement('div');
  ReactDOM.render(<BoxView title={title} events={events} />, div);
});

it('renders on bad props without crashing', () => {
  const title = '';
  const div = document.createElement('div');
  ReactDOM.render(<BoxView title={title} />, div);
});

