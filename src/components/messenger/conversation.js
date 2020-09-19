import React from 'react'
import logo from '../../logo.svg'
import { connect } from 'react-redux'
import { saveUsername, getMessegeList } from '../../actions/conversation'
import axios from 'axios'
import Avatar from '@material-ui/core/Avatar'




class Conversation extends React.Component {

  handleClick () {
    var data = new FormData()
      data.append('token', window.localStorage.getItem('token'))
      data.append('conversation_id', localStorage.getItem('conv_id'))
      data.append('date', '')
      data.append('size', 20)

    axios.post('http://click.7grid.ir/conversation/details/', data)
        .then((response) => {
          console.log('get messeges successful, data:', response.data) 
          //localStorage.setItem('messeges', response.data.messages)
          var messegelist = []
          var messeges = response.data.data.messages
          var id = localStorage.getItem('id')
          for(var i = 0 ;i < messeges.length; i++){
            if(messeges[i].sender.id == id){
              messegelist.push({text:response.data.data.messages[i].text, sender:1})
            }
            else{
              messegelist.push({text:response.data.data.messages[i].text, sender:0})
            }
          }
          this.props.dispatch(getMessegeList(messegelist))
        })
        .catch( (error) => {
          console.log(error)
        })
    localStorage.setItem('conv_id', this.props.id)
    this.props.dispatch(saveUsername(this.props.user.email, this.props.id))
    //this.props.dispatch(getMessegeList([{text:'salam', sender:0},{text:'salam', sender:1} , {text:'chetori', sender:0}]))
  }


  render () {
   
    return (
      <div className='conversation' onClick={() => this.handleClick()}>
        <Avatar style={{margin: 10}} >A</Avatar>
        <div className='info'>
          <span>{this.props.user.email} </span>
          {/* <span>{this.props.date} </span> */}
          <span>{this.props.unseen[this.props.friendid] ? 'you have messege' : 'no messages yet'} </span>
          <span 
            style={{ borderRadius: 70, 
              backgroundColor: 'lightblue', 
              width:17, 
              position: 'relative', 
              alignItems: 'right',
              left: 200,
              margin: 10
            }}
          >
            {this.props.unseen[this.props.friendid]}
          </span>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
})

export default connect(mapDispatchToProps)(Conversation)
