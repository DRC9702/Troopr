import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import CreateAccountView from '../Components/CreateAccountView';

it('renders without crashing', () => {
  const lc = jest.fn();
  const div = document.createElement('div');
  ReactDOM.render(<Router><CreateAccountView loginChecker={lc} history={{}} /></Router>, div);
});
