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
    state = {
        activeTab: 0,
    }

    isPath = (path) => {
        return this.props.location.pathname == path;
    }

    onTabChange = (e, newValue) => {
        this.setState({
            activeTab: newValue
        });
    };

    render() {
        const { children, classes } = this.props;
        const { activeTab } = this.state;

        // Pass props to this.children elements
        const childrenWithProps = React.Children.map(children, child =>
            React.cloneElement(child, { activeTab })
        );

        return (
            <div className="page">
                <header role="header">
                    <TopNav />
                    {
                        this.isPath('/') ? <TabList activeTab={activeTab} onTabChange={this.onTabChange} /> : null
                    }
                </header>
                <main className="main" role="main">
                    <div className="container">
                        { childrenWithProps }
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