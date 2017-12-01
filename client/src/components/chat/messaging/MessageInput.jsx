import React, { Component } from 'react';
export default class MessageInput extends Component {

	constructor(props) {
		super(props);
		this.state = { message: ""};
	}

	/*
	*	Handles submitting of form.
	*	@param e {Event} onsubmit event
	*/
	handleSubmit = (e) => {
		e.preventDefault()
		this.sendMessage()
		this.setState({ message: "" })
	}

	/*
	*	Send message to add to chat.
	*/
	sendMessage = () => {
		this.props.sendMessage(this.state.message)
		// this.blur()
	}

	componentWillUnmount() {
		// this.stopCheckingTyping();
	}

	/*
	*	Starts/Stops the interval for checking 
	*/
	// sendTyping() {
	// 	this.lastUpdateTime = Date.now()
	// 	if (!this.state.isTyping) {
	// 		this.setState({ isTyping: true })
	// 		this.props.sendTyping(true);
	// 		this.startCheckingTyping()
	// 	}
	// }

	// /*
	// *	Start an interval that check if the user is typing
	// */
	// startCheckingTyping() {
	// 	this.typingInterval = setInterval(() => {

	// 		if ((Date.now() - this.lastUpdateTime) > 300) {
	// 			this.setState({ isTyping: false })
	// 			this.stopCheckingTyping()
	// 		}
	// 	}, 300)
	// }

	/*
	*	Stops the interval from checking if the user is typing
	*/
	// stopCheckingTyping() {
	// 	if (this.typingInterval) {
	// 		clearInterval(this.typingInterval)
	// 		this.props.sendTyping(false)
	// 	}
	// }

	render() {
		const { message } = this.state
		return (
			<form
				onSubmit={this.handleSubmit}
				className="chat-form">

				<div class="form-group form-inline">
					<input
						id="message"
						ref={"messageinput"}
						type="text"
						className="form-control"
						value={message}

						autoComplete={'off'}
						placeholder="Type something to send"
						// onKeyUp={(e) => { e.keyCode !== 13 && this.sendTyping() }}
						onChange={
							({ target: { value: v } }) => {
								this.setState({ message: v })
							}
						} />
						<button
					disabled={message.length < 1}
					type="submit"
					className="btn"><i class="fa fa-paper-plane" aria-hidden="true"></i>
						</button>
				</div>
				
			</form>
		);
	}
}