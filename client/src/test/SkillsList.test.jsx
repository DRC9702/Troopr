import React from 'react';
import ReactDOM from 'react-dom';
// import renderer from 'react-test-renderer';
import SkillsList from '../Components/SkillsList';


it('renders with good props without crashing', () => {
  // const component = renderer.create(
  //   <SelectSkills />,
  // );
  // let tree = component.toJSON();
  // expect(tree).toMatchSnapshot();
  const sk = ['java', 'hello'];

  const div = document.createElement('div');
  ReactDOM.render(<SkillsList skills={sk} title="test" />, div);
});

it('renders with bad props without crashing', () => {
  // const component = renderer.create(
  //   <SelectSkills />,
  // );
  // let tree = component.toJSON();
  // expect(tree).toMatchSnapshot();
  const sk = [];

  const div = document.createElement('div');
  ReactDOM.render(<SkillsList skills={sk} title="" />, div);
});
