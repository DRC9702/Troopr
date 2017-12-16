import React from 'react';
import ReactDOM from 'react-dom';
import HeaderView from '../Components/HeaderView';

it('renders without crashing', () => {
  const lh = jest.fn();
  const div = document.createElement('div');
  ReactDOM.render(<HeaderView show isLoggedIn logoutHandler={lh} />, div);
  ReactDOM.render(<HeaderView show logoutHandler={lh} />, div);
});
