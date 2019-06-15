/*
Import extenal libraries
*/
import React, { Component } from 'react';

import ConversationList from '../../components/conversation-list';

class ChatPage extends Component {
    render() {
        return (
            <React.Fragment>
                <ConversationList />
            </React.Fragment>
        )
    }
}

export default (ChatPage);