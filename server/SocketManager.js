const io = require('./server.js').io;
let connectedUsers = {};

const {
    COMMUNITY_CHAT,
    MESSAGE_RECIEVED,
    MESSAGE_SENT,
    USER_CONNECTED,
    USER_DISCONNECTED,
    TYPING,
    STOP_TYPING,
    VERIFY_USER,
    LOGOUT,
    PRIVATE_MESSAGE
} = require('./events')

const {
    createUser,
    createChat,
    createMessage
} = require('./factories')
let communityChat = createChat();

module.exports = function (socket) {

    let sendMessageToChatFromUser;
    let sendTypingFromUser;

    socket.on(VERIFY_USER, function (newUser, callback) {
        console.log("new user  ", newUser);
            callback({
                user: createUser({
                    user: newUser,
                    socketId: socket.id
                })
            })
    })


    //userconnects 2
    socket.on(USER_CONNECTED, function (user) {
        user.socketId = socket.id;
        connectedUsers = addUser(connectedUsers, user)
        socket.user = user;
        sendMessageToChatFromUser = sendMessageToChat(user.name)
        sendTypingFromUser = sendTypingToChat(user.name)
        io.emit(USER_CONNECTED, connectedUsers)

    })


    //user disconnects 3
    socket.on('disconnect', function () {
        if ("user" in socket) {
            connectedUsers = removeUser(connectedUsers, socket.user.name)

            io.emit(USER_DISCONNECTED, connectedUsers)
        }

    })

    //user logout 4
    socket.on(LOGOUT, function () {
        connectedUsers = removeUser(connectedUsers, socket.user.name)
    })

    //send community chat 5
    socket.on(COMMUNITY_CHAT, function (callback) {
        callback(communityChat)
    })

    //user sends message 6
    socket.on(MESSAGE_SENT, function ({ chatId, message  }) {
        sendMessageToChatFromUser(chatId, message)
    })

    //add user to typing users on chatId 7
    socket.on(TYPING, function ({ chatId, isTyping }) {
        sendTypingFromUser(chatId, isTyping);
    })

    // socket.on(PRIVATE_MESSAGE, ({reciever, sender, activeChat})=>{
	// 	if(reciever in connectedUsers){
    //         const recieverSocket = connectedUsers[reciever].socketId
    //         if(activeChat === null || activeChat.id === parentsChat.id) {
	// 		const newChat = createChat({ name:`${reciever} & ${sender}`, users:[reciever, sender] })
	// 		socket.to(recieverSocket).emit(PRIVATE_MESSAGE, newChat)
    //         socket.emit(PRIVATE_MESSAGE, newChat)
    //         } else {
    //             socket.to(recieverSocket).emit(PRIVATE_MESSAGE, activeChat);
    //         }
	// 	}
	// })

}

function isUser(userList, username) {
    return username in userList;
}

function addUser(userList, user) {
    let newList = Object.assign({}, userList);
    newList[user.name] = user;
    return newList;
}

function removeUser(userList, username) {
    let newList = Object.assign({}, userList);
    delete newList[username];
    return newList;
}

/*
* Returns a function that will take a chat id and message
* and then emit a broadcast to the chat id.
* @param sender {string} username of sender
* @return function(chatId, message)
*/
sendMessageToChat = (sender) => {
   return (chatId, message) => {
                io.emit(`${MESSAGE_RECIEVED}-${chatId}`, createMessage({message, sender}))
              }
} 

/*
* Returns a function that will take a chat id and boolean isTyping variable
* and then emit a broadcast to the chat id that the sender is typing
* @param sender {string} username of sender
* @return function(chatId, isTyping)
*/
sendTypingToChat = (user) => {
    return (chatId, isTyping) => { io.emit(`${TYPING}-${chatId}`, {user, isTyping}) }
}