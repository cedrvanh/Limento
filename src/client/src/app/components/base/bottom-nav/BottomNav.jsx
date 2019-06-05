import React from 'react';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import InfoIcon from '@material-ui/icons/InfoRounded';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

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
    },
});

function BottomNav(props) {
    const { classes } = props;
    const [value, setValue] = React.useState(0);

    return (
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        className={[classes.sticky, classes.bottomNav]}
      >
        <BottomNavigationAction component={Link} to="/home" label="Recents" icon={<RestoreIcon />} />
        <BottomNavigationAction component={Link} to="/news" label="Favorites" icon={<FavoriteIcon />} />
        <Fab component={Link} to="/create" color="secondary" aria-label="Add" className={classes.fabButton}>
          <AddIcon />
        </Fab>
        <BottomNavigationAction component={Link} to="/about" label="About" icon={<InfoIcon />} />
        <BottomNavigationAction component={Link} to="/chat" label="Messages" icon={<ChatBubbleIcon />} />
      </BottomNavigation>
    );
}

export default withStyles(styles)(BottomNav);