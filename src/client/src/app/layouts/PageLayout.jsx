import React from 'react';

/*
Import styling
*/
import logo from '../assets/images/logo.svg';
import './Page.scss';

import Grid from '@material-ui/core/Grid';

import TopNav from '../components/base/top-nav';
import AppHeader from '../components/base/header';
import BottomNav from '../components/base/bottom-nav';
import TabList from '../components/tab-list';

class PageLayout extends React.Component {
    render() {
        const { children, classes } = this.props;

        return (
            <div className="page">
                <header role="header">
                    <TopNav />
                    <TabList />
                    {/* <AppHeader /> */}
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