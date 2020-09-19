
const Init = {
  name: '',
  // newMessage: '',
  messageList: [
    {
      text: '',
      sender: 1
    }
  ],
  conversationList: [],
  conv_id:0
}

export default function conversation (state = Init, action) {
  console.log('action:;;;', state, action)
  switch (action.type) {
    case 'SAVE_USERNAME':
      return {
        ...state,
        name: action.payload,
        conv_id: action.conv_id
      }

    case 'SEND_NEW_MESSAGE':
      return {
        ...state,
        // newMessage: action.payload,
        messageList: [
          ...state.messageList,
          {
            text: action.payload,
            sender: 1
          }
        ]
      }

    case 'EDIT_MESSAGE':
      let newMessageList = state.messageList
      newMessageList[action.index] = {
        sender: 1,
        text: action.payload
      }
      return {
        ...state,
        messageList: newMessageList
      }

    case 'GET_CONVERSATION_LIST':
      return {
        ...state,
        conversationList: action.payload
      }

      case 'GET_MESSEGE_LIST':
      return {
        ...state,
        messageList: action.payload
      }

    default:
      return state
  }
}
