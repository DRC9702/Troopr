import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import CreateProfileView from '../Components/CreateProfileView';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><CreateProfileView /></Router>, div);
});
