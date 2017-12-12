import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import ProfileView from '../Components/ProfileView';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><ProfileView /></Router>, div);
});
