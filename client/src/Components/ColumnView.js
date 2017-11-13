import React, { Component } from 'react';

class ColumnView extends Component {

    //TODO: viewHandler
  constructor(props){
    super(props);
    if (this.props.viewName === 'profile')
      this.viewHandler = this.props.toProfileHandler;
    else
      this.viewHandler = this.props.toProfileHandler;
  }

  render() {
    return (
      <div className="ColumnView" style={styles} onClick={this.props.toProfileHandler}>
      	<p>
          Troopr {this.props.viewName}
        </p>
      </div>
    );
  }
}

const styles = {
    backgroundColor: 'purple',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '300px',
    width: '300px',
    borderRadius: '10px',
};

export default ColumnView;
