/*
Import extenal libraries
*/
import React, { Component } from 'react';
import io from 'socket.io-client';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import ChatInput from '../../components/chat-input';
import { Api, Auth } from '../../services';
import Spinner from '../../components/base/spinner';

class ChatMessagePage extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: true,
            uid: Auth.getCurrentUID(),
            message: '',
            messages: [],
            conversation: null,
        };

        this.socket = io('http://127.0.0.1:8080');

        this.socket.on('RECEIVE_MESSAGE', function(data){
            addMessage(data);
        });

        const addMessage = (message) => {            
            Api.createMessage(message)
                .then(res => {
                    const conversationId = res.conversation;
                    const newMessageId = res.id;

                    const updatedConversation = {
                        messages: newMessageId
                    }

                    Api.updateConversation(conversationId, updatedConversation);
                });
        };

        this.sendMessage = () => {
            this.socket.emit('SEND_MESSAGE', {
                conversation: this.props.match.params.id,
                sender: this.state.uid,
                body: this.state.message
            })

            this.setState({ message: '' });

        }
    }

    componentDidMount() {
        this.loadConversationById(this.props.match.params.id);
    }

    loadConversationById = (id) => {
        Api.findOneConversation(id)
            .then(res => {
                this.setState({
                    conversation: res,
                    isLoading: false,
                })
                console.log(this.state.conversation);
            }).catch(err => console.log(err));
    }
    
    render() {
        const { isLoading, conversation } = this.state;

        return (
            <React.Fragment>
                { isLoading ? <Spinner /> : 
                    <React.Fragment>
                        <p>Chat Message</p>
                        <div className="messages">
                            <List>
                                {conversation && conversation.messages.map(message => (
                                    <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar alt={ message.sender.name } src={ message.sender.avatar } />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={ message.sender.name }
                                            secondary={
                                                <p>{ message.body }</p>
                                            }
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </div>
                        <ChatInput value={this.state.message} onChange={(e) => this.setState({ message: e.target.value })} onClick={this.sendMessage} />
                    </React.Fragment>
                }
            </React.Fragment>
        )
    }
}

export default (ChatMessagePage);