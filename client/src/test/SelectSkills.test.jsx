import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import SelectSkills from '../Components/SelectSkills';


it('renders without crashing', () => {
  // const component = renderer.create(
  //   <SelectSkills />,
  // );
  // let tree = component.toJSON();
  // expect(tree).toMatchSnapshot();

  const div = document.createElement('div');
  ReactDOM.render(<SelectSkills />, div);
});
