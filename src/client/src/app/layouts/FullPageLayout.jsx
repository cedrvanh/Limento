import React from 'react';

/*
Import styling
*/
import './Page.scss';

class PageLayout extends React.Component {
    render() {
        const { children, classes } = this.props;

        return (
            <div className="page--full">
                <main className="main" role="main">
                    <div className="container">
                        { children }
                    </div>
                </main>
            </div>
        )
    }
}
 
export default PageLayout;