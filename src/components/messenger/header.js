import React from 'react'
//import Time from 'react-time'

export default class Header extends React.Component {
  render () {
    console.log('chat header props:'+this.props.name)
    return (
      <div className='header' style={{padding:20}}>
        {this.props.name}
        
      </div>
    )
  }
}
