
/*
Import extenal libraries
*/
import React, { Component } from 'react';

/*
Import internal libraries
*/
import { Api } from '../../services';
import { PostsList } from '../../components/post';
import Spinner from '../../components/base/spinner';
import FilterPanel from '../../components/filter-panel';
import SearchInput from '../../components/search-input';
import { filterNullFromObj } from '../../utilities';

class HomePage extends Component {
    _isMounted = false;
    
    state = {
          posts: [],
          isLoading: true,
          queried: false,

          filters: {
            selectedCategory: '',
            selectedTag: '',
            selectedSort: ''
        }
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

    onFilterChange = (e) => {        
        const { filters } = {...this.state};
        const currentState = filters;
        const { id, value } = e.target;
        currentState[id] = value;

        this.setState({
            filters: currentState
        });
    }

    onFilterSubmit = () => {
        const query = {
            category: this.state.filters.selectedCategory || null,
            tag: this.state.filters.selectedTag || null,
            sort: this.state.filters.selectedSort || null,
        }

        filterNullFromObj(query);

        this.setState({
            queried: true,
        });

        this.loadPosts(query);
    }

    onSearchSubmit = () => {
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
        const { posts, isLoading, query, filters } = this.state;

        return (
            <React.Fragment>
                <section className="section__content section__content--articles">
                    <FilterPanel isDrawerOpen={isDrawerOpen} filters={filters} handleDrawer={handleDrawer} handleFilterChange={this.onFilterChange} handleFilterSubmit={this.onFilterSubmit} />
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