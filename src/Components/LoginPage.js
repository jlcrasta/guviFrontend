import React, { Component } from 'react'
import Register from '../Components/SignInForm'
import UserDetails from './UserDetails';



export class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            page: 'Login',
            // fetched: false,
            users: '',
            accessToken: '',
            message: this.props.message
        }
        this.handleRegister = this.handleRegister.bind(this)
    }

    loginFormChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    loginFormSubmit = async (e) => {
        e.preventDefault();


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");


        const url = "http://localhost:4000/createUser/login";
        const raw = JSON.stringify({
            "name": this.state.username,
            "password": this.state.password
        })
        const userData = await fetch(url, {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
            message: ''

        })
        const data = await userData.json()
        this.setState({ users: data })



        if (data === "User Not Found") {
            this.setState({ page: "Login", message: "User Not Found" })
        }
        if (data === "Worng credentials") {
            this.setState({ page: "Login", message: "Worng credentials" })
        }
        if (data.name && data.accessToken) {

            this.setState({ page: "UserDetails", accessToken: data.accessToken })
        }


    }
    handleRegister() {
        this.setState({ page: "Register" })

    }



    render() {
        //console.log(this.state)
        if (this.state.page === "Register") {
            return (
                <Register />
            )
        }
        if (this.state.page === "UserDetails") {
            //console.log(this.state.page)

            return (
                <UserDetails token={this.state.accessToken} />
            )
        }





        if (this.state.page === 'Login') {

            return (
                <div>
                    <div className="loginPage">
                        <h2>User Login</h2>

                        <p className='loginMsg'>{this.state.message}</p>

                        <form onSubmit={this.loginFormSubmit}>
                            <label htmlFor="userName">Enter Username</label>
                            <input
                                type="text"
                                id='userName'
                                placeholder='Username'
                                name='username'
                                onChange={this.loginFormChange}
                                required={true} />

                            <label htmlFor="userPassword">Enter Password</label>
                            <input
                                type="password"
                                id='userPassword'
                                placeholder='Password'
                                name='password'
                                onChange={this.loginFormChange}
                                required={true} />



                            <button type='submit'>Login</button>
                        </form>
                    </div>

                    <button onClick={this.handleRegister} className="ancherTag">Create New User</button>
                </div>
            )



        }

    }
}

export default LoginPage