import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import EventView from '../Components/EventsView';

it('renders without crashing', () => {
  const params = { searchKey: '$all' };
  const path = '/events/:searchKey';
  const url = '/events/$all';
  const match = { path, url, params };
  const div = document.createElement('div');
  ReactDOM.render(<Router><EventView match={match} /></Router>, div);
});
