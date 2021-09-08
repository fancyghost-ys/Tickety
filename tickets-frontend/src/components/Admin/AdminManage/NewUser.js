import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../../Auth';
import Dashboard_Layout from '../../Layouts/Dashboard_Layout/Dashboard_Layout';
import { newUser } from '../apiAdminCore';
import '../AdminDashboard/AdminDashboard.css'

const NewUser = () => {
    const { token } = isAuthenticated()
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        error: '',
        success: false,
        redirectTo: false
    })
    const { firstName, lastName, email, password, success, error, redirectTo } = values

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }
    const validateForm = (firstName, lastName, email, password) => {
        if ((firstName === '' || lastName === '' || email === '' || password === '')
            || password.length < 6) {
            setValues({
                error: `Validation Error
                    Make sure the first/last name is not empty, email is valid 
                    Password length more than 6`, success: false
            })
            return false
        }
        else {

            return true
        }
    }

    const clickSubmit = async (event) => {
        event.preventDefault()
        if (validateForm(firstName, lastName, email, password)) {
            setValues({ ...values, error: false })
            await newUser({ firstName, lastName, email, password }, token)
                .then(data => {
                    if (data.error) {
                        setValues({ ...values, error: data.error, success: false })
                    }
                    else {
                        setValues({ ...values, firstName: '', lastName: '', email: '', password: '', error: '', success: true, redirectTo: true })
                    }
                })
        }
    }
    const showError = () => (
        <div className="alert alert-danger fs-6 h-1" height="4" style={{ display: error ? '' : 'none' }}>
            <p>x {error}</p>
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            <h2>Hi, Dear</h2>
            <p>Your account is created Successfully,<Link to="/signin">Signin</Link></p>
        </div>
    )

    const redirectUser = () => {
        if (redirectTo) {
            return <Redirect to="/admin/dashboard" />;
        }
    };
    const newPostForm = () => (
        <form className="container">
            {showError()}
            {showSuccess()}
            {redirectUser()}
            <div className="form-group">
                <label className="text-muted fs-5">First name</label>
                <input onChange={handleChange('firstName')} type="text" className="form-control"
                    value={firstName}
                />
            </div>
            <div className="form-group">
                <label className="text-muted fs-5">Last name</label>
                <input onChange={handleChange('lastName')} type="text" className="form-control"
                    value={lastName}
                />
            </div>
            <div className="form-group">
                <label className="text-muted fs-5">E-Mail</label>
                <input onChange={handleChange('email')} type="email" className="form-control"
                    id="validationDefault01"
                    value={email} />
            </div>
            <div className="form-group">
                <label className="text-muted fs-5">Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control"
                    value={password} />
            </div>
            <button onClick={clickSubmit} class="w-100 btn btn-ls my-2 btn-sub" type="submit">Submit</button>
            <p class="mt-2 mb-1 fs-6 ">&copy; 2010–2021 Tickety</p>
        </form>
    );
    return (
        <Dashboard_Layout
            HeaderPage="New Customer"
            Description={`Create New Customer`}
            className="form-window"
            childern={newPostForm()}
        />
    );
};

export default NewUser;