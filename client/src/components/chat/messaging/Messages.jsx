import React, { Component } from 'react';

export default class Messages extends Component {
	
	/*
	*	Scrolls down the view of the messages.
	*/
	scrollDown = () => {
		const { container } = this.refs
		container.scrollTop = container.scrollHeight
	}
	
	componentDidUpdate(newProps){
		this.scrollDown();

	}

	componentDidMount(){
		this.scrollDown();
	}

	render() {
        const { messages, user, typingUsers } = this.props;
		return (
			<div ref={'container'} 
					className="thread-container">
					<div className="thread">
					{
						messages.map((mes, i)=>{
							return( 
								<div key={mes.id} className={`message-container ${mes.sender === user.name && 'right'}`}>
									<div className="data">
										<span className="name">{mes.sender !== user.name ? mes.sender: ''} </span>
										<span className="time">at {mes.time}</span>
									</div>
									<div className="message">{mes.message}</div>
								</div>
							)
						})
						
					}
					{
						typingUsers.map((name)=>{
							return(
								<div key={name} className="typing-user">
								{`${name} is typing . . .`}
								</div>
								)
						})
					}

					</div>
			</div>
		);
	}
}