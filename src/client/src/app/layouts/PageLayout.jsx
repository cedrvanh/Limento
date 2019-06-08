import React from 'react';

/*
Import styling
*/
import logo from '../assets/images/logo.svg';
import './Page.scss';

import Grid from '@material-ui/core/Grid';

import TopNav from '../components/top-nav';
import BottomNav from '../components/bottom-nav';
import TabList from '../components/tab-list';

class PageLayout extends React.Component {

    isPath = (path) => {
        return this.props.location.pathname == path;
    }

    render() {
        const { children, classes } = this.props;

        return (
            <div className="page">
                <header role="header">
                    <TopNav />
                    {
                        this.isPath('/') ? <TabList /> : null
                    }
                </header>
                <main className="main" role="main">
                    <div className="container">
                        { children }
                    </div>
                </main>
                <footer role="footer">
                    <BottomNav />
                </footer>
            </div>
        )
    }
}
 
export default PageLayout;