import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { signup } from '../index'
import Auth from '../../Layouts/Auth/Auth'
import './Register.css'

const Register = () => {
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
    const clickSubmit = async (event) => {
        event.preventDefault()
        setValues({ ...values, error: false })
        await signup({ firstName, lastName, email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false })
                }
                else {
                    setValues({ ...values, firstName: '', lastName: '', email: '', password: '', error: '', success: true, redirectTo: true })
                }
            })
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
            return <Redirect to="/signin" />;
        }
    };
    const signUpForm = () => (
        <form>
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
    )
    return (
        <Auth HeaderPage="Register"
            Description="Hello in Tickety"
            className="contianer col-md-8 offset-2"
            Childern={signUpForm()}
        >
        </Auth>
    )
}
export default Register;