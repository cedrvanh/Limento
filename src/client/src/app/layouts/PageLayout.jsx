import React from 'react';

/*
Import styling
*/
import logo from '../assets/images/logo.svg';
import './Page.scss';

import Media from 'react-media';
import TopNav from '../components/top-nav';
import BottomNav from '../components/bottom-nav';
import TabList from '../components/tab-list';
import { Auth } from '../services';

class PageLayout extends React.Component {
    state = {
        activeTab: 0,
        isDrawerOpen: false,
        uid: Auth.getCurrentUID()
    }

    isPath = (path) => {
        return this.props.location.pathname == path;
    }

    onTabChange = (e, newValue) => {
        this.setState({
            activeTab: newValue
        });
    };

    onLogOut = () => {
        this.props.history.push('/logout');
    }

    handleDrawer = () => {
        this.setState(prevState => ({ isDrawerOpen: !prevState.isDrawerOpen }));
    };

    render() {
        const { children, classes } = this.props;
        const { activeTab, uid, isDrawerOpen } = this.state;

        // Pass props to this.children elements
        const childrenWithProps = React.Children.map(children, child =>
            React.cloneElement(child, { activeTab, isDrawerOpen, handleDrawer: this.handleDrawer })
        );

        return (
            <div className="page">
                <header role="header">
                    <Media query="(max-width: 750px)">
                        {matches =>
                            matches ? (
                                <TopNav onLogOut={this.onLogOut} handleDrawer={this.handleDrawer} />
                            ) : (
                                <TopNav onLogOut={this.onLogOut} handleDrawer={this.handleDrawer} desktop uid={uid} />
                            )
                        }
                    </Media>  
                    
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
                    <Media query="(max-width: 750px)">
                        {matches =>
                            matches ? (
                                <BottomNav uid={ uid } />
                                
                            ) : null
                        }
                    </Media>   
                </footer>
            </div>
        )
    }
}
 
export default PageLayout;