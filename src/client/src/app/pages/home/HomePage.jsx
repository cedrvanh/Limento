
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

class HomePage extends Component {
    state = {
          posts: [],
    };

    componentWillMount() {
        this.loadPosts();
    }

    loadPosts = () => {
        Api.findAllPosts()
            .then((data) => {
                this.setState(prevState => ({
                    ...prevState,
                    posts: data
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
        const { posts } = this.state;

        return (
            <React.Fragment>
                <section>
                    <header>
                        <h2>Feed</h2>
                    </header>
                    <PostCard />
                    {/* <div className="section__content section__content--articles">
                        <PostsList posts={posts} onReadMore={this.goToPostDetailPage} />
                    </div> */}
                </section>
            </React.Fragment>
        )
    }
}

export default (HomePage);