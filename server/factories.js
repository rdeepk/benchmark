const uuid = require('uuid/v4');

const createUser = ({user = {}, socketId = null } = {}) => ({
    id: user.id,
    name: user.name,
    socketId
})

const createMessage = ({message = "", sender =""} = {}) => ({
    id: uuid(),
    time: getTime(new Date(Date.now())),
    message,
    sender
})

const getTime = (date) => {
    return `${date.getHours()}:${("0"+ date.getMinutes()).slice(-2)}`
}

const createChat = ({ name="", messages =[], users = []} = {}) =>({
    id: uuid(),
    name,
    messages,
    users,
    typingUsers:[]
})

module.exports = {
    createMessage,
    createChat,
    createUser
}