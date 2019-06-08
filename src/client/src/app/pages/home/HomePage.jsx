
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
import PostCard from '../../components/post-card';
import TabList from '../../components/tab-list';
import Spinner from '../../components/base/spinner';

class HomePage extends Component {
    state = {
          posts: [],
          isLoading: true,
    };

    componentWillMount() {
        this.loadPosts();
    }

    loadPosts = () => {
        Api.findAllPosts()
            .then((data) => {
                this.setState(prevState => ({
                    ...prevState,
                    posts: data,
                    isLoading: false
                }));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    goToPostDetailPage = (id) => {
        this.props.history.push(`/news/${id}`);
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