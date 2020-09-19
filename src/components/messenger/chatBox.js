import React from 'react'
import HeaderContainer from '../../container/HeaderContainer'
import ChatScreen from './chatScreen'
import Footer from './footer'
import ChatScreenContainer from '../../container/chatScreenContainer'
import FooterContainer from '../../container/FooterContainer'

export default class ChatBox extends React.Component {
  constructor () {
    super()
    this.state = {
      newMessage: ''
    }

    this.getNewMessage = this.getNewMessage.bind(this)
  }

  getNewMessage (newMessage) {
    console.log('##', newMessage)
    this.setState({ newMessage })
  }

  render () {
    console.log('chatbox props::  ',this.props)
    return (
      <div className='chat-box'>
        <HeaderContainer />
        <ChatScreenContainer />
        <FooterContainer />
      </div>
    )
  }
}
