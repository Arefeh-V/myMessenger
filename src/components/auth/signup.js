import React from 'react'
import validate from '../../validation/ValidateFunction'
import { Link } from 'react-router-dom'
import MyInput from './input'
import Button from './button'
import axios from 'axios'
// import { TestComponent, TestComponent2 } from '../../test.js'

class SignUp extends React.Component {
  constructor () {
    super()
    this.state = {
      fields: {
        email: '',
        password: '',
        retypePassword: ''
      },
      error: {
        email: '',
        password: ''
      },
      clicked: false
    }
    // this.handleClick = this.handleClick.bind(this)
  }

  handleChange (key, value) {
    // console.log('####', key, value)
    this.setState({ ...this.state, fields: { ...this.state.fields, [key]: value } })
  }

  handleClick () {
    if (this.state.password === this.state.retypePassword) {
      var data = new FormData()
      data.append('email', this.state.fields.email)
      data.append('password', this.state.fields.password)

      axios.post('http://click.7grid.ir/auth/signup/', data)
        .then( (response) =>{
          console.log('signup successful data:', response.data)
          window.localStorage.setItem('token', response.data.token)
          this.props.history.push('/')
        })
        .catch( (error) => {
          console.log(error + 'fields: '+ data)
        })
    } else {
      this.setState({ error: 'invalid password' })
    }
  }

  render () {
    console.log('signup loaded: '+this.state)
    return (
      <div className='container'>
        <div className='inputContainer'>
          <p><b>SignUp</b></p>
          <MyInput
            lable='email'
            name='email'
            placeholder='email'
            //error='enter your email'
            value={this.state.email}
            myOnChange={(key, value) => this.handleChange(key, value)}
            myonBlur={(e)=>{}}
          />
          <MyInput
            lable='password'
            type='password'
            name='password'
            //error='enter password'
            placeholder='password'
            value={this.state.password}
            myOnChange={(key, value) => this.handleChange(key, value)}
            myonBlur={(e)=>{}}
          />

          <MyInput
            lable='confirm password'
            type='password'
            name='retypePassword'
            //error='enter password again'
            placeholder='confirm password'
            value={this.state.retypePassword}
            myOnChange={(key, value) => this.handleChange(key, value)}
            myonBlur={(e)=>{}}
          />
          <Button 
          className='save-btn' 
          lable='Sign Up'
          myOnClick = {() => this.handleClick()}
           />

        </div>
      </div>
    )
  }
}

export default SignUp
