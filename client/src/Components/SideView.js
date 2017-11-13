import React, { Component } from 'react';
import {Button} from 'react-bootstrap';

class SideView extends Component {

  // render() {
  //   return (
  //     <div className="SideView" style={styles}>
  //       {/*<p>*/}
  //         {/*Troopr SIDEVIEW*/}
  //       {/*</p><br/>*/}
  //         {/*<p>*/}
  //             {/*Troopr SIDEVIEW*/}
  //         {/*</p><br/>*/}
  //         <Sidebar side='left' isVisible={ this.state.isVisible } onHide={ () => this.updateModal(false) }>
  //             <Nav>
  //                 <NavItem href="#">Link 1</NavItem>
  //                 <NavItem href="#">Link 2</NavItem>
  //                 <NavItem href="#">Link 3</NavItem>
  //                 <NavItem href="#">Link 4</NavItem>
  //             </Nav>
  //         </Sidebar>
  //     </div>
  //
  //       //<Image src="../Images/default.png" circle/>
  //   );
  // }

    constructor(props) {
        super(props);

        // this.state = {
        //     isVisible: false,
        // };
    }

    render() {
      return (
        <div className="SideView" style={styles}>
          <p>
            Username
          </p><br/>
            <Button bsStype='info'>Edit Profile</Button>
            {/*<p>*/}
                {/*Troopr SIDEVIEW*/}
            {/*</p><br/>*/}
            {/*<Image src="../Images/default.png" circle/>*/}
        </div>

          //<Image src="../Images/default.png" circle/>
      );
    }

    // updateModal(isVisible) {
    //     this.state.isVisible = isVisible;
    //     this.forceUpdate();
    // }
    //
    // render() {
    //     return (
    //         <div>
    //             <Button bsStyle="primary" onClick={ () => this.updateModal(true) }><Glyphicon glyph="menu-hamburger"/></Button>
    //             <Sidebar side='left' isVisible={ this.state.isVisible }>
    //                 <Nav>
    //                     <NavItem href="#">Link 1</NavItem>
    //                     <NavItem href="#">Link 2</NavItem>
    //                     <NavItem href="#">Link 3</NavItem>
    //                     <NavItem href="#">Link 4</NavItem>
    //                 </Nav>
    //             </Sidebar>
    //         </div>
    //     );
    // }
}

const styles = {
    backgroundColor: 'green',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center ',
    height: '100vh',
    width: '300px',
};

export default SideView;
