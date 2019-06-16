import React from 'react';
import { Link } from 'react-router-dom';

import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import FilterIcon from '@material-ui/icons/FilterList';
import ExitIcon from '@material-ui/icons/ExitToApp';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Title from '../base/title';

import '../../layouts/Page.scss';

const styles = theme => ({
    root: {
        flexGrow: 1,
        
    },
    title: {
        flexGrow: 1,
        color: 'white'
    },
    colorDefault: {
        backgroundColor: '#FF5555',
        boxShadow: 'none'
    },
});

function TopNav(props) {
    const { classes, backBar, history, onLogOut, handleDrawer, desktop, uid } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);

    function handleMenu(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    function isPath(path) {
        return props.location.pathname == path;
    }

    if (backBar) {
        return (
            <div className={classes.root}>
                <AppBar className={classes.colorDefault}>
                    <Toolbar>
                        <ArrowBackIcon onClick={() => history.goBack()}/>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }

    if (desktop) {
        return (
            <React.Fragment>
                <div className="nav-bar">
                    <ul className="nav">
                        <li className="nav__link">
                            <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
                                Home
                            </Link>
                        </li>
                        <li className="nav__link">
                            <Link to={`/profile/${uid}`} style={{ textDecoration: 'none', color: 'white' }}>
                                Profile
                            </Link>
                        </li>
                        <li className="nav__link">
                            <Link to='/chat' style={{ textDecoration: 'none', color: 'white' }}>
                                Chat
                            </Link>
                        </li>
                        <li className="nav__link">
                            <Link to='/about' style={{ textDecoration: 'none', color: 'white' }}>
                                About
                            </Link>
                        </li>
                        <li className="nav__link">
                            <Link to='/feed/create' style={{ textDecoration: 'none', color: 'white' }}>
                                New Post
                            </Link>
                        </li>
                        {
                            isPath('/') ?  
                            <IconButton
                                aria-label="Filter of posts"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleDrawer}
                                color="white"
                            >
                                <FilterIcon />
                            </IconButton> : null
                        }
                       
                        <IconButton
                            aria-label="User actions"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={onLogOut}
                            color="white"
                        >
                            <ExitIcon />
                        </IconButton>
                    </ul>
                </div>
            </React.Fragment>
        );
    }

    return (
        <div className={classes.root}>
            <AppBar className={classes.colorDefault}>
                <Toolbar>
                    <Title type={3} className={classes.title}>
                        Limento
                    </Title>
                    {
                        isPath('/') ?  
                        <IconButton
                            aria-label="Filter of posts"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleDrawer}
                            color="inherit"
                        >
                            <FilterIcon />
                        </IconButton> : null
                    }
                    <IconButton
                        aria-label="User actions"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={onLogOut}
                        color="inherit"
                    >
                        <ExitIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withRouter(withStyles(styles)(TopNav));