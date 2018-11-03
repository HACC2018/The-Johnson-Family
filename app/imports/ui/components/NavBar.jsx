import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Image } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const menuStyle = {
      marginBottom: '10px',
      backgroundColor: '#ace1af',
      padding: '0px',
      fontSize: '20px',
      fontFamily: 'Roboto',
    };
    const itemStyle = {
      padding: '5px',
      marginLeft: '20px',
    };
    const leftItemStyle = {
      padding: '5px',
      marginLeft: '20px',
      marginRight: '20px',
      backgroundColor: '#9ed8a1',
    };
    const noImgPadding = {
      padding: '0px',
    };
    return (
        <Menu style={menuStyle} attached="top" borderless inverted>
          {/* LOGO ITEM */}
          <Menu.Item style={noImgPadding} as={NavLink} activeClassName="" exact to="/">
            <Image src='https://media.discordapp.net/attachments/506038349052641302/507754069998436352/1.png' size='small'/>
          </Menu.Item>
          {/* Additional menu when signed in as admin */}
          {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Menu.Item as={NavLink} activeClassName="active" exact to="/admin" key='admin'>Input Audit</Menu.Item>
          ) : ''}
          {/* Top right not signed in */}
          <Menu.Item style={itemStyle} position="right">
            {this.props.currentUser === '' ? (
                <Dropdown  text="Login" pointing="top right" icon={'user'}>
                  <Dropdown.Menu>
                    <Dropdown.Item icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
                    <Dropdown.Item icon="add user" text="Sign Up" as={NavLink} exact to="/signup"/>
                  </Dropdown.Menu>
                </Dropdown>
            ) : (
                <Menu.Item style={menuStyle}>
                  <Menu.Item position='right' as={NavLink} activeClassName="active" style={itemStyle}
                             exact to="/Home" key='Home'>Home
                  </Menu.Item>
                  <Menu.Item as={NavLink} activeClassName="active" style={itemStyle}
                             exact to="/list" key='list'>Submit Data
                  </Menu.Item>
                  <Menu.Item as={NavLink} activeClassName="active" style={itemStyle}
                             exact to="/dash" key='dash'>Dashboard
                  </Menu.Item>
                  <Menu.Item style={ leftItemStyle }>
                    <Dropdown pointing="top right" icon={'user'}>
                      <Dropdown.Menu>
                        <Dropdown.Item icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Menu.Item>
                </Menu.Item>
            )}
            {/* Top right when user is signed in ABOVE */}
          </Menu.Item>
        </Menu>
    );
  }
}

/** Declare the types of all properties. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBarContainer);
