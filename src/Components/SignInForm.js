import React, { Component } from 'react'
import "../App.css"
import LoginPage from './LoginPage';


export class SignInForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            page: 'Register',
            message: ''

        }
        this.handleLogin = this.handleLogin.bind(this)


    }
    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = async (e) => {
        e.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const url = "http://localhost:4000/createUser";
        const raw = JSON.stringify({
            "name": this.state.username,
            "email": this.state.email,
            "password": this.state.password
        })
        const userData = await fetch(url, {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'

        })
        const data = await userData.json()

        if (data._id) {
            this.setState({ users: data, page: "Login", message: "User Created Login" })
        }

        //console.log(data)
        if (data.message) {
            this.setState({ page: "Register", message: data.message })
        }
        //console.log(this.state)

    }

    handleLogin = (e) => {
        this.setState({ page: "Login" })
    }

    render() {

        const { username, email, password } = this.state

        if (this.state.page === "Register") {
            return (

                <div className='registerUser' >

                    <h2>Sign in Form</h2>
                    <p className='loginMsg'>{this.state.message}</p>
                    <form className='registerUserForm' onSubmit={this.submitHandler}>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id='username'
                            name="username"
                            value={username}
                            placeholder='usersname'
                            onChange={this.changeHandler}
                            required={true} />

                        <label htmlFor="userEmail">Email</label>
                        <input
                            type="email"
                            id='userEmail'
                            value={email}
                            name="email"
                            placeholder='Email'
                            onChange={this.changeHandler}
                            required={true} />

                        <label htmlFor="userPass">Password</label>
                        <input
                            type="password"
                            id='userPass'
                            value={password}
                            name='password'
                            placeholder='Password'
                            onChange={this.changeHandler}
                            required={true} />

                        <button type='submit'>Register</button>
                    </form>

                    <button onClick={this.handleLogin} className="ancherTag">Login Page</button>
                </div>
            )
        }
        if (this.state.page === "Login") {
            return (
                <LoginPage message={this.state.message} />
            )
        }


    }
}

export default SignInForm