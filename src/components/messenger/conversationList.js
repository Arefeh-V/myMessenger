import React from 'react'
import Conversation from './conversation'
import axios from 'axios'
import { getConversationList } from '../../actions/conversation'
import { connect } from 'react-redux'


class ConversationList extends React.Component {
  constructor () {
    super()
    this.state = {
      suggestUsers: [],
      myId: localStorage.getItem('id')
    }
  }



  handleSearch (e) {
    if (e) {
      var data = new FormData()
      data.append('token', window.localStorage.getItem('token'))
      data.append('query', e)
      data.append('size', 4)

      axios.post('http://click.7grid.ir/explore/search/contacts/',data)
        .then((response) => {
          this.setState({suggestUsers: response.data.data.users})
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  componentDidMount () {
    axios.get('http://click.7grid.ir/conversation/', {
      params: {
        token: localStorage.getItem('token')
      }
    })
    .then((response) => {
      console.log('conversationss are:'+ response.data);
      this.props.dispatch(getConversationList(response.data.data.conversation_details))
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  createConversation(id) {
    //var search = document.getElementsByClassName('search')
    //console.log('z is: '+ z)
    var data = new FormData()
    data.append('token', window.localStorage.getItem('token'))
    data.append('user_id', id)

    axios.post('http://click.7grid.ir/conversation/',data)
      .then((response) => {
        console.log('create conversation::', response.data)
        //this.props.dispatch(getConversationList(response.data))
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render () {
    console.log('convlist: '+this.props.conversationList.latest_message)
    return (
      <div className='conversation-list'>
        <input
          placeholder='search here'
          onChange={(e) => this.handleSearch(e.target.value)}
        />
        {
          this.state.suggestUsers.map((user) => {
            return (
              <p className='search'
                key={user.id}
                onClick={() => this.createConversation(user.id)}
              >{user.email}</p>
            )
          })
        }
        {
          this.props.conversationList.map((conv) => (
            conv.users.map((user) => {
              if(user.id != this.state.myId) {
                return (
                  <Conversation
                  date = {conv.latest_message_date}
                  id ={conv.id}
                  friendid={conv.users[0].id}
                  unseen={conv.unseen_messages}
                  user={user} 
                  key={user.id} />
                )
              } else {
                return null
              }
            })
          ))
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  conversationList: state.conversationList
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(ConversationList)