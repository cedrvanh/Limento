import React from 'react';
import classNames from 'classnames';

import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/InfoRounded';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import ProfileIcon from '@material-ui/icons/Person';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

// Color variables
const ICON_COLOR    = '#FF5555';

const styles = theme => ({
    sticky: {
      width: '100%',
      position: 'fixed',
      bottom: 0,
    },

    bottomNav: {
        boxShadow: '0px 1px 5px #DEDEDE'
    },

    fabButton: {
      position: 'absolute',
      zIndex: 1,
      top: -30,
      left: 0,
      right: 0,
      margin: '0 auto',
      backgroundColor: ICON_COLOR,
    },

    root: {
      color: '#BBB',
      '&$selected': { 
        color: '#BBB', 
      }, 
    },
    selected: {}
});

function BottomNav(props) {
    const { classes, uid } = props;
    const [value, setValue] = React.useState(0);

    const profileRoute = `/profile/${uid}`;

    return (
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        className={[classes.sticky, classes.bottomNav]}
      >
        <BottomNavigationAction 
          className={[classes.root, classes.selected]}
          component={Link} 
          to="/" 
          label="Home" 
          icon={<HomeIcon />} 
        />
        <BottomNavigationAction 
          className={[classes.root, classes.selected]}
          component={Link} 
          to={profileRoute} 
          label="Profile" 
          icon={<ProfileIcon />} 
        />
        <Fab component={Link} to="/feed/create" color="secondary" aria-label="Add" className={classes.fabButton}>
          <AddIcon />
        </Fab>
        <BottomNavigationAction 
          className={[classes.root, classes.selected]}
          component={Link} 
          to="/chat" 
          label="Messages" 
          icon={<ChatBubbleIcon />} 
        />
        <BottomNavigationAction 
          className={[classes.root, classes.selected]}
          component={Link} 
          to="/about" 
          label="About" 
          icon={<InfoIcon />} 
        />
      </BottomNavigation>
    );
}

export default withStyles(styles)(BottomNav);