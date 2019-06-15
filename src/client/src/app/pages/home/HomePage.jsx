
/*
Import extenal libraries
*/
import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';

/*
Import internal libraries
*/
import { Api } from '../../services';
import { PostsList } from '../../components/post';
import Spinner from '../../components/base/spinner';
import FilterPanel from '../../components/filter-panel';

class HomePage extends Component {
    _isMounted = false;
    
    state = {
          posts: [],
          isLoading: true,
    };

    componentWillMount() {
        this._isMounted = true;
        this.loadPosts();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    loadPosts = () => {
        Api.findAllPosts()
            .then((data) => {
                if (this._isMounted) {
                    this.setState(prevState => ({
                        ...prevState,
                        posts: data,
                        isLoading: false
                    }));
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    goToPostDetailPage = (id) => {
        this.props.history.push(`/feed/${id}`);
    }

    render() {
        const { activeTab, isDrawerOpen, handleDrawer } = this.props;
        const { posts, isLoading } = this.state;

        return (
            <React.Fragment>
                <section className="section__content section__content--articles">
                    <FilterPanel isDrawerOpen={isDrawerOpen} handleDrawer={handleDrawer} />
                    <p onClick={this.handleDrawerOpen}>Click me</p>
                    {
                        isLoading ? <Spinner /> : <PostsList posts={posts} onReadMore={this.goToPostDetailPage} activeTab={activeTab}/>
                    } 
                </section>
            </React.Fragment>
        )
    }
}

export default (HomePage);