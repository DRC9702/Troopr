import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import EventList from '../Components/EventsList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><EventList events={[]} /></Router>, div);
});
