import React from 'react';
import ReactDOM from 'react-dom';
import SelectSkills from '../Components/SelectSkills';

const changeBox = jest.fn();


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SelectSkills
    list={['Java', 'Python', 'JavaScript', 'C', 'C++', 'SQL', 'OCaml', 'Go',
  'Perl', 'PHP', 'ML', 'iOS', 'Android', 'UI', 'Ruby', 'Matlab', 'NoSQL']}
    title="Skills"
    changeCheckbox={changeBox}
  />, div);
});
