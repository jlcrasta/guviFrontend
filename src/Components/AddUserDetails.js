import React, { Component } from 'react'
import UserDetails from './UserDetails';



export class AddUserDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            age: "",
            gender: 'male',
            DOB: '',
            mobile: '',
            page: 'UserDetailsForm',
            accessToken: this.props.token
        }
        this.handleAddForm = this.handleAddForm.bind(this)
    }

    async handleAddForm(e) {

        e.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append("authorization", `Bearer ${this.state.accessToken}`);
        myHeaders.append("Content-Type", "application/json");

        const url = 'http://localhost:4000/createUser/userDetails'

        var raw = JSON.stringify({
            "age": this.state.age,
            "gender": this.state.gender,
            "DOB": this.state.DOB,
            "mobile": this.state.mobile
        });
        console.log(raw)
        const userDetails = await fetch(url, {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        })

        const data = await userDetails.json()

        if (data.userDetails.user) {
            //console.log(data)
            this.setState({ page: "UserDetails" })
        }

    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }


    render() {
        const { age, gender, DOB, mobile } = this.state;
        if (this.state.page === "UserDetailsForm") {
            return (
                <div className='updateDetails'>
                    <h2>Enter user details</h2>
                    <div className='updateDetailsForm'>
                        <form onSubmit={this.handleAddForm}>
                            <label htmlFor="age">Enter age</label>
                            <input
                                type="text"
                                id='age'
                                name='age'
                                placeholder='age'
                                required
                                value={age}
                                onChange={this.changeHandler} />

                            <label htmlFor="gender">Enter Gender</label>
                            <select name="gender" id="gender" onChange={this.changeHandler} value={gender}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>

                            <label htmlFor="dob">Enter DOB</label>
                            <input
                                type="date"
                                id='dob'
                                name='DOB'
                                placeholder='DOB'
                                required
                                value={DOB}
                                onChange={this.changeHandler} />

                            <label htmlFor="mobile">Enter Mobile</label>
                            <input
                                type="number"
                                id='mobile'
                                name='mobile'
                                placeholder='mobile'
                                max="10"
                                min={10}
                                required
                                value={mobile}
                                onChange={this.changeHandler} />

                            <button type='submit'>Add Details</button>
                        </form>
                    </div>
                </div>
            )
        }
        if (this.state.page === "UserDetails") {
            return (
                <UserDetails token={this.state.accessToken} />
            )
        }
    }
}

export default AddUserDetails