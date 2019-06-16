/*
Import extenal libraries
*/
import React, { Component } from 'react';

import ConversationList from '../../components/conversation-list';
import Spinner from '../../components/base/spinner';


import { Api } from '../../services';

class ChatPage extends Component {
    state = {
        isLoading: true, 
        conversations: [],
    }

    componentDidMount() {
        this.loadConversations();
    }

    goToChatMessagePage = (id) => {
        this.props.history.push(`/chat/${id}`);
    }

    loadConversations = () => {
        Api.findAllConversations()
            .then(res => {
                this.setState({
                    conversations: res,
                    isLoading: false,
                })
                console.log(res);
            })
    }

    render() {
        const { isLoading, conversations } = this.state;

        return (
            <React.Fragment>
            {   isLoading ? <Spinner /> : <ConversationList conversations={conversations} onConversationClick={this.goToChatMessagePage} /> }
        </React.Fragment>
        )
    }
}

export default (ChatPage);