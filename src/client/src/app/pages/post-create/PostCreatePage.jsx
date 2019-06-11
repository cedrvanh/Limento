/*
Import extenal libraries
*/
import React, { Component } from 'react';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

import TextInput from '../../components/base/text-input';
import Title from '../../components/base/title';

import { Api, Auth } from '../../services';

class PostCreatePage extends Component {
    state = {
        types: [],
        postType: null,
        title: '',
        synopsis: ''
    }

    componentWillMount() {
        this.loadPostTypes(); 
    }

    loadPostTypes = () => {
        Api.findAllPostTypes()
            .then(data => {
                this.setState({
                    types: data
                });
            });
    }

    onSubmit = () => {
        const post = {
            title: this.state.title,
            synopsis: this.state.synopsis,
            typeId: this.state.postType,
            userId: Auth.getCurrentUID()
        }
       
        Api.createPost(post) 
            .then(res => {
                console.log(`User: ${post.userId} created a new post`);
            });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    render() {
        const { types } = this.state;

        return (
            <React.Fragment>
                <section class="banner">
                    <Title type={1}>Create a new post</Title>
                </section>
                <FormControl component="fieldset">
                    <RadioGroup
                    
                    aria-label="PostType"
                    name="post-type"
                    row
                    onChange={(e) => this.handleChange(e)}
                    >
                        {types && types.map( (type, index) => (
                            <FormControlLabel key={ type.id } value={ type.id } control={<Radio id="postType" />} label={ type.name } />
                        ))}
                    </RadioGroup>
                </FormControl>

                <TextInput id='title' label="Title" value={this.state.title} onChange={(e) => this.handleChange(e)} />
                <TextInput id='synopsis' label="Synopsis" value={this.state.synopsis} onChange={(e) => this.handleChange(e)} />

                <Button variant="contained" color="secondary" fullWidth onClick={this.onSubmit}>
                    Create post
                </Button>
            </React.Fragment>
        )
    }
}

export default (PostCreatePage);