import React from 'react'
import sendIcon from '../../send.png'
import { connect } from 'react-redux'
import { sendNewMessage, getMessegeList } from '../../actions/conversation'
import axios from 'axios'

class Footer extends React.Component {
  constructor () {
    super()
    this.state = {
      newMessage: ''
    }
  }

  sendMessage () {
    var data = new FormData()
      data.append('token', window.localStorage.getItem('token'))
      data.append('text', this.state.newMessage)
      data.append('conversation_id', localStorage.getItem('conv_id'))
    axios.post('http://click.7grid.ir/conversation/create/', data)
    .then((response) => {
      console.log('new message sent :'+ response.message);
      this.props.dispatch(sendNewMessage(this.state.newMessage))
      this.setState({ newMessage: '' })
    })
    .catch(function (error) {
      console.log('new message creation error:',error);
    })
    //this.props.dispatch(getMessegeList([{text:'salam', sender:0},{text:'chetori', sender:1}, {text: this.state.newMessage, sender:1}]))
    //this.props.dispatch(sendNewMessage(this.state.newMessage))
    //this.setState({ newMessage: '' })
    
  }
  render () {
    
    return (
      <div className='footer'>
        <input
          className='new-message'
          value={this.state.newMessage}
          onChange={(e) => this.setState({ newMessage: e.target.value })}
        />
        <span
          width='40px'
          onClick={() => this.sendMessage()}
          src={sendIcon}>send
            </span> 
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
})

export default connect(mapDispatchToProps)(Footer)
