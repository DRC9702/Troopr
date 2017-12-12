import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import EditProfileView from '../Components/EditProfileView';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><EditProfileView /></Router>, div);
});
