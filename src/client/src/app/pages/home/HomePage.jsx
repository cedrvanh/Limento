
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
import SearchInput from '../../components/search-input';

class HomePage extends Component {
    _isMounted = false;
    
    state = {
          posts: [],
          isLoading: true,
          queried: false,
    };

    componentWillMount() {
        this._isMounted = true;
        this.loadPosts();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    loadPosts = (query) => {
        Api.findAllPosts(query)
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

    onSearchHandler = (e) => {
        this.setState({
            query: e.target.value
        })
    }

    onSearchSubmit = (e) => {
        const query = {
            search: this.state.query
        }

        this.setState({
            queried: true,
        });

        this.loadPosts(query);
    }

    render() {
        const { activeTab, isDrawerOpen, handleDrawer } = this.props;
        const { posts, isLoading, query } = this.state;

        return (
            <React.Fragment>
                <section className="section__content section__content--articles">
                    <FilterPanel isDrawerOpen={isDrawerOpen} handleDrawer={handleDrawer} />
                    {
                        isLoading ? <Spinner /> : (
                        <React.Fragment>
                            <SearchInput onChange={this.onSearchHandler} onClick={this.onSearchSubmit} />
                            <PostsList posts={posts} onReadMore={this.goToPostDetailPage} activeTab={activeTab} query={query} />
                        </React.Fragment>
                        )
                    } 
                </section>
            </React.Fragment>
        )
    }
}

export default (HomePage);