import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import DashboardView from '../Components/DashboardView';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><DashboardView /></Router>, div);
});
