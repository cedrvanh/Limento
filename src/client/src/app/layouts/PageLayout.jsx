import React from 'react';

/*
Import styling
*/
import logo from '../assets/images/logo.svg';
import './Page.scss';

import TopNav from '../components/base/top-nav';
import BottomNav from '../components/base/bottom-nav';

class PageLayout extends React.Component {
    render() {
        const { children, classes } = this.props;

        return (
            <div className="page">
                <header role="header">
                    {/* <TopNav /> */}
                </header>
                <main className="main" role="main">
                    { children }
                </main>
                <footer role="footer">
                    <BottomNav />
                </footer>
            </div>
        )
    }
}
 
export default PageLayout;