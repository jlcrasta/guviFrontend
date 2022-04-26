import React, { Component } from 'react'
import AddUserDetails from './AddUserDetails';
import LoginPage from './LoginPage';
import UpdateDetails from './UpdateDetails'

/*;*/



export class UserDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: "Loading",
            fetched: false,
            users: '',
            accessToken: this.props.token
        }
        this.handleUpdateDetails = this.handleUpdateDetails.bind(this)

    }


    handleUpdateDetails = () => {
        this.setState({ page: "UpdateDetails" })
    }

    handleLogout = () => {
        this.setState({ page: "LoginPage", accessToken: '' })
    }

    async componentDidMount() {
        //console.log(this.state.accessToken)
        const url = "http://localhost:4000/createUser/getDetails";
        const myHeaders = new Headers();
        myHeaders.append("authorization", `Bearer ${this.state.accessToken}`)

        const userData = await fetch(url,
            {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            }
        )
        const data = await userData.json()
        this.setState({ fetched: true, users: data })
        console.log(data)

        if (this.state.users.userDetails) {
            this.setState({ page: "UserDetails" })

        }
        if (this.state.users === '') {
            this.setState({ page: "Loading" })
        }
        if (this.state.users.message) {
            console.log(this.state.users)
            this.setState({ page: "AddUserDetails" })
        }

    }

    render() {

        if (this.state.page === 'Loading') {
            return (
                <div><h2>Loading ............</h2></div>
            )
        }

        if (this.state.page === "UserDetails") {

            return (

                <div className='userDetails'>
                    <div>
                        <h2>Details of user <span>{this.state.users.userDetails.user}</span></h2>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Age :</td><td>{this.state.users.userDetails.age}</td>
                                </tr>
                                <tr>
                                    <td>Gender :</td><td>{this.state.users.userDetails.gender}</td>
                                </tr>
                                <tr>
                                    <td>DOB :</td><td>{this.state.users.userDetails.DOB}</td>
                                </tr>
                                <tr>
                                    <td>Mobile :</td><td>{this.state.users.userDetails.mobile}</td>
                                </tr>
                            </tbody>
                        </table>

                        <button className='updateBtn' onClick={this.handleUpdateDetails}>Update Details</button>


                        <button className='logoutBtn' onClick={this.handleLogout}>Logout</button>
                    </div>
                </div>
            )

        }
        if (this.state.page === "UpdateDetails") {
            return (
                <UpdateDetails currentDetails={this.state.users} token={this.state.accessToken} />
            )

        }
        if (this.state.page === "AddUserDetails") {
            return (
                <AddUserDetails token={this.state.accessToken} />
            )
        }
        if (this.state.page === "LoginPage") {
            return (
                <LoginPage />
            )
        }
    }

}

export default UserDetails