/*
Import extenal libraries
*/
import React, { Component } from 'react';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';

import TextInput from '../../components/base/text-input';
import Title from '../../components/base/title';
import Spinner from '../../components/base/spinner';

import { Api, Auth } from '../../services';
import Tag from '../../components/base/tag';
import SelectInput from '../../components/base/select-input';

class PostCreatePage extends Component {
    state = {
        isLoading: true,
        types: [],
        categories: [],
        tags: [],
        selectedType: null,
        selectedCategory: null,
        selectedTags: [],
        title: '',
        synopsis: '',
        price: null,
    }

    async componentWillMount() {
        await this.loadPostTypes(); 
        await this.loadCategories(); 
        await this.loadTags();
    }

    loadPostTypes = () => {
        Api.findAllPostTypes()
            .then(res => {
                this.setState({
                    types: res,
                });
            });
    }

    loadCategories = () => {
        Api.findAllCategories()
            .then(res => {
                this.setState({
                    categories: res,
                });
            });
    }
    
    loadTags = () => {
        Api.findAllTags()
            .then(res => {
                this.setState({
                    tags: res,
                    isLoading: false,
                })
            })
    }

    onSubmit = () => {
        const post = {
            title: this.state.title,
            synopsis: this.state.synopsis,
            type: this.state.selectedType,
            tags: this.state.selectedTags,
            user: Auth.getCurrentUID()
        }
       
        Api.createPost(post) 
            .then(res => {
                console.log(`User: ${post.user} created a new post`);
            })
    }

    onTagClick = (e, id) => {
        if (this.state.selectedTags.indexOf(id) < 0) {
            this.setState({
                selectedTags: [...this.state.selectedTags, id]
            });
        } else {
            this.setState(prevState => ({
                selectedTags: prevState.selectedTags.filter((i) => i !== id)
            }));
        }
    } 

    handleChange = (e) => {
        console.log(e.target.id);
        console.log(e.target.value);
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    render() {
        const { types, categories, tags, isLoading } = this.state;

        return (
            <React.Fragment>
                {
                    isLoading ? <Spinner /> : 
                    <React.Fragment>
                        <Title type={1}>Create a new post</Title>
                        <FormControl component="fieldset">
                            <RadioGroup
                            
                            aria-label="PostType"
                            name="post-type"
                            row
                            onChange={this.handleChange}
                            >
                                {types && types.map((type, index) => (
                                    <FormControlLabel key={ type.id } value={ type.id } control={<Radio id="selectedType" />} label={ type.name } />
                                ))}
                            </RadioGroup>
                        </FormControl>

                        <TextInput type={'text'} id='title' label="Title" value={this.state.title} onChange={(e) => this.handleChange(e)} />
                        <TextInput type={'text'} id='synopsis' label="Synopsis" value={this.state.synopsis} onChange={(e) => this.handleChange(e)} />
                        <TextInput type={'number'} id='price' label="Price" value={this.state.price} onChange={(e) => this.handleChange(e)} />

                        <section class="category_wrapper">
                            <SelectInput id="selectedCategory" onChange={this.handleChange}>
                                {categories && categories.map((category, index) => (
                                    <option key={ category.id } value={ category.name }>{ category.name }</option>
                                ))}
                            </SelectInput>
                        </section>

                        <section class="tag__wrapper">
                            {tags && tags.map((tag, index) => (
                                <Tag key={ tag.id } label={ tag.name } value={ tag.id } onTagClick={this.onTagClick}/>
                            ))}
                        </section>
                                        
                        <Button variant="contained" color="secondary" fullWidth onClick={this.onSubmit}>
                            Create post
                        </Button>
                    </React.Fragment>
                }
            </React.Fragment>
        )
    }
}

export default (PostCreatePage);