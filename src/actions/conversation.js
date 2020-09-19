export const saveUsername = (name, conv_id) => ({
  type: 'SAVE_USERNAME',
  payload: name,
  conv_id: conv_id
})

export const sendNewMessage = (newMessage) => ({
  type: 'SEND_NEW_MESSAGE',
  payload: newMessage
})

export const editMessage = (text, index) => ({
  type: 'EDIT_MESSAGE',
  payload: text,
  index: index
})

export const getConversationList = (data) => ({
  type: 'GET_CONVERSATION_LIST',
  payload: data
})

export const getMessegeList = (messageList) => ({
  type: 'GET_MESSEGE_LIST',
  payload: messageList
})