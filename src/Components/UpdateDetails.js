import React, { Component } from 'react'
import UserDetails from './UserDetails';



export class UpdateDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            age: this.props.currentDetails.userDetails.age,
            gender: this.props.currentDetails.userDetails.gender,
            DOB: this.props.currentDetails.userDetails.DOB,
            mobile: this.props.currentDetails.userDetails.mobile,
            page: 'UpdateForm',
            token: this.props.token
        }
        this.handleUpdateForm = this.handleUpdateForm.bind(this)
    }

    handleUpdateForm = async (e) => {
        e.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append("authorization", `Bearer ${this.state.token}`);
        myHeaders.append("Content-Type", "application/json");


        console.log(this.state)
        const url = "http://localhost:4000/createUser/updateDetails";
        var raw = JSON.stringify({
            "age": this.state.age,
            "gender": this.state.gender,
            "DOB": this.state.DOB,
            "mobile": this.state.mobile
        });

        var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const userData = await fetch(url, requestOptions)
        const data = await userData.json()
        //console.log(data)
        this.setState({ page: "UserDetails" })
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        //console.log(this.props.currentDetails.userDetails)
        const { age, gender, DOB, mobile } = this.state
        if (this.state.page === 'UpdateForm') {
            return (
                <div className='updateDetails'>
                    <h2>Update User Details</h2>
                    <div className='updateDetailsForm'>
                        <form onSubmit={this.handleUpdateForm}>
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
                                maxLength={10}
                                minLength={10}
                                required
                                value={mobile}
                                onChange={this.changeHandler} />

                            <button type='submit'>Update Details</button>
                        </form>
                    </div>
                </div>
            )
        }
        if (this.state.page === "UserDetails") {
            return (
                <UserDetails token={this.state.token} />
            )
        }
    }
}

export default UpdateDetails