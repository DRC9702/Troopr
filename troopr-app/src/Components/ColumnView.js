import React, { Component } from 'react';

class ColumnView extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="ColumnView" style={styles}>
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
};

export default ColumnView;
