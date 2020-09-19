import React from 'react'
import logo from '../../message.png'
import validate from '../../validation/ValidateFunction'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { withRouter } from "react-router"
import MyInput from './input'
import Button from './button'
// import { TestComponent, TestComponent2 } from '../../test.js'

class Login extends React.Component {
  constructor () {
    super()
    this.state = {
      fields: {
        email: '',
        password: ''
      },
      error: {
        email: '',
        password: ''
      },
      clicked: false
    }
    // this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    axios.post('http://click.7grid.ir/auth/signin/', {
      email: this.state.fields.email,
      password: this.state.fields.password
    })
      .then((response) => {
        window.localStorage.setItem('token', response.data.data.token)
        window.localStorage.setItem('id', response.data.data.profile.id)
        this.props.history.push('/messenger/')
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleValidation (e) {
    let name = e.target.name
    let error = validate(name, this.state.fields[name])
    console.log('error:::', error)

    this.setState({ ...this.state, error: { ...this.state.error, [name]: error } })
  }

  handleChange (key, value) {
    // let fields = this.state.fields
    // fields['username'] = event.target.value
    // this.setState({fields})

    //let name = value

    this.setState(
      { ...this.state, fields: { ...this.state.fields, [key]: value } },
      () => { console.log('####', this.state.fields.email) }
    )
    //console.log(this.state.fields.email, value)
  }

  render () {
    console.log('props',this.props)
    return (
      <div className='container'>
        <div className='inputContainer'>
          <img src={logo} width='100px'
            style={
              {
                alignSelf: 'center',
                marginBottom: '1px'
              }
            }
          />
          {this.state.error.email !== null &&
            <p style={{ color: 'red' }}>{this.state.error.email}</p>
          }
          <MyInput
            lable='email'
            name='email'
            placeholder='email'
            //error='enter your email'
            value={this.state.email}
            myOnChange={(key, value) => this.handleChange(key, value)}
            myonBlur={(e) => this.handleValidation(e)}
          />
          {this.state.error.password !== null &&
            <p style={{ color: 'red' }}>{this.state.error.password}</p>
          }
          <MyInput
            lable='password'
            type='password'
            name='password'
            //error='enter password'
            placeholder='password'
            value={this.state.password}
            myOnChange={(key, value) => this.handleChange(key, value)}
            myonBlur={(e) => this.handleValidation(e)}
          />

          <Button 
          className='save-btn' 
          lable='Login'
          myOnClick = {() => this.handleClick()}
          style={{ backgroundColor: this.state.clicked ? 'lightblue' : '#fff' }}
           />

        </div>
      </div>
    )
  }
}

export default withRouter(Login)
