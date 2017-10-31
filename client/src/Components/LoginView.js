import React, { Component } from 'react';

class LoginView extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="LoginView" style={loginBoxStyle}>
      	<p>
          Troopr Login
        </p>
        <form style={formStyle} onSubmit={this.props.loginHandler}>
	        <input
	          type="text"
	          placeholder="Username"
	        />
          <input
	          type="text"
	          placeholder="Password"
	        />
          <input type="submit" value="Login" />
      	</form>
      </div>
    );
  }
}

const loginBoxStyle = {
    backgroundColor: 'purple',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '500px',
    width: '500px',
    borderRadius: '10px',
};

const formStyle = {
  backgroundColor: 'yellow',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignItems: 'center',
  width: '50vh',
};

export default LoginView;
