import React from 'react';

/*
Import styling
*/
import './Page.scss';
import TopNav from '../components/top-nav';

class PageWithoutBottomLayout extends React.Component {
    render() {
        const { children } = this.props;

        return (
            <div className="page">
                <header role="header">
                    <TopNav history={this.props.history} backBar/>
                </header>
                <main className="main" role="main">
                    <div className="container">
                        { children }
                    </div>
                </main>
            </div>
        )
    }
}
 
export default PageWithoutBottomLayout;