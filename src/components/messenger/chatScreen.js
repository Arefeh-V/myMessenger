import React from 'react'
import { connect } from 'react-redux'
import { editMessage } from '../../actions/conversation'
import Fab from '@material-ui/core/Fab'
import EditIcon from '@material-ui/icons/Edit'

class ChatScreen extends React.Component {
  constructor () {
    super()
    this.state = {
      editMode: false,
      id: -1
    }
  }

  componentDidMount(){
    
  }
  // componentDidUpdate () {
  //   console.log('propsss::1111111')
  // }

  editMessageFunction (e, index) {
    this.props.dispatch(editMessage(e.target.value, index))
    this.setState({editMode: this.state.editMode})
  }

  saveEdit (e) {
    if (e.key === 'Enter') {
      this.setState({editMode: false})
    }
  }
  render () {
    console.log('chatscreen props:', this.props.messageList)
    return (
      <div className='chat-screen'>
        {
        this.props.messageList.map((message, index) => {

          console.log('sender', message.sender)
          
          if (message.sender === 1) {

            if (!(this.state.editMode && this.state.id === index) ){
              return (
                <>
                <p key={index}  >

                  <span className='sender'>
                    {message.text}
                  </span>
                    
                  <Fab size='small'>
                  
                    <EditIcon
                      onclick={()=> console.log('edit clicked')}/>     
                   
                  </Fab>
                </p>
                
                </>
              )
            } else {
              return(
                <div className='sender'>
                  <input 
                    key={index}
                    value={message.text}
                    onChange={(e) => this.editMessageFunction(e, index)}
                    onBlur={() => this.setState({ editMode: false })}
                  />
                </div>
              )}
          }else{
            return (
              <div key={index} className='receiver' ><span>{message.text}</span></div>
            )
          }
          })
        }
       </div>
      
    )
  }
}

const mapStateToProps = (state) => ({
  messageList: state.messageList
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen)
