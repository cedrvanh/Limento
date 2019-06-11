
/*
Import extenal libraries
*/
import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';

/*
Import internal libraries
*/
import { Api } from '../../services';
import PostsList from '../../components/posts-list';
import Spinner from '../../components/base/spinner';

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
        const { posts, isLoading } = this.state;

        return (
            <React.Fragment>
                <section className="section__content section__content--articles">
                    {
                        isLoading ? <Spinner /> : <PostsList posts={posts} onReadMore={this.goToPostDetailPage} />
                    } 
                </section>
            </React.Fragment>
        )
    }
}

export default (HomePage);