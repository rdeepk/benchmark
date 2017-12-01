import React, { Component } from 'react';
import Messages from './messaging/Messages';
import MessageInput from './messaging/MessageInput';
import { COMMUNITY_CHAT, MESSAGE_RECIEVED, MESSAGE_SENT, TYPING, PRIVATE_MESSAGE } from '../../utils/events'

export default class ChatContainer extends Component {
	
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	 activeChat:null,
	  	 chats:[]
	  };
	}

	componentDidMount() {
		const { socket } = this.props
		socket.emit(COMMUNITY_CHAT, this.resetChat)
		this.initSocket()
    }
    
    sendOpenPrivateMessage = (reciever) => {
        const { socket, user } = this.props
        const { activeChat } = this.state;
		socket.emit(PRIVATE_MESSAGE, {reciever, sender:user.name, activeChat})
	}

	
	/*
	*	Initializes the socket.
	*/	
	initSocket = () => {
		const { socket } = this.props
        socket.on('connect', ()=>{ socket.emit(COMMUNITY_CHAT, this.resetChat) })
        socket.on(PRIVATE_MESSAGE, this.addChat);
	}

	/*
	*	Reset the chat back to only the chat passed in.
	* 	@param chat {Chat}
	*/
	resetChat = (chat) => { 
		return this.addChat(chat, true)
	}

	/*
	*	Adds chat to the chat container, if reset is true removes all chats
	*	and sets that chat to the main chat.
	*	Sets the message and typing socket events for the chat.
	*	
	*	@param chat {Chat} the chat to be added.
	*	@param reset {boolean} if true will set the chat as the only chat.
	*/
	addChat = (chat, reset = false) => {
		const { socket } = this.props
		const { chats } = this.state
		const newChats = reset ? [chat] : [...chats, chat]
		
		this.setState({chats:newChats, activeChat:chat})
		
		const messageEvent = `${MESSAGE_RECIEVED}-${chat.id}`
		const typingEvent = `${TYPING}-${chat.id}`

		socket.on(messageEvent, this.addMessageToChat(chat.id))
		socket.on(typingEvent, this.updateTypingInChat(chat.id))
	}

	/*
	* Adds message to chat 
	* @param chatId {number}
	*/
	addMessageToChat = (chatId) => {
		return message =>{
			const { chats } = this.state
			let newChats = chats.map((chat) => {
				if(chat.id === chatId)
					chat.messages.push(message)
				return chat;
			})
			this.setState({chats:newChats})
		}
	}

	/*
	*	Updates the typing of chat with id passed in.
	*	@param chatId {number}
	*/
	updateTypingInChat = (chatId) => {
		return ({isTyping, user}) =>{
					if(user !== this.props.user.name){

						const { chats } = this.state
						let newChats = chats.map((chat) => {
							if(chat.id === chatId){
								if(isTyping && !chat.typingUsers.includes(user))
									chat.typingUsers.push(user)
								else if(!isTyping && chat.typingUsers.includes(user))
									chat.typingUsers = chat.typingUsers.filter(u => u !== user)
							}
							return chat;
						})
						this.setState({chats:newChats})
					}
				}
	}

	/*
	*	Adds a message to the specified chat
	*	@param chatId {number}  The id of the chat to be added to.
	*	@param message {string} The message to be added to the chat.
	*/
	sendMessage = (chatId, message) => {
 
		const { socket } = this.props

		socket.emit(MESSAGE_SENT, {chatId, message})
		
	}

	/*
	*	Sends typing status to server.
	*	chatId {number} the id of the chat being typed in.
	*	typing {boolean} If the user is typing still or not.
	*/
	sendTyping= (chatId, isTyping) => {

        const { socket } = this.props;
		socket.emit(TYPING, {chatId, isTyping})
		
	}

	/*
	*	Set the active the chat of the ChatRoom.
	*	@param {Chat} The chat object to that is active.
	*/
	setActiveChat = (chat) => {
		this.setState({activeChat:chat})
	}

	render() {
		const { user } = this.props 
		 const { activeChat, chats } = this.state
		 console.log("active", activeChat);
		 console.log("chats", chats);
		return (
			<div>
					{
						activeChat !== null ? (
							<div className="chat-room">
								<div className="messages">
									<Messages 
										messages={activeChat.messages} 
										user={user} 
										typingUsers={activeChat.typingUsers}/>
								</div>
								<div className="message-input">
									<MessageInput 
										sendMessage={
											(message)=>{ 
												this.sendMessage(activeChat.id, message) 
											}
										} 
									/>
								</div>
							</div>
							) : ''
					}
			</div>
		);
	}
}
