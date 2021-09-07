import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { isAuthenticated, authenticate, signin, signout } from '../index'
import Auth from '../../Layouts/Auth/Auth'
import App from '../../../App'

const Signin = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        success: false,
        redirect: false
    })
    const { email, password, success, error, redirect } = values
    const { user } = isAuthenticated();
    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const clickSubmit = async (event) => {
        event.preventDefault()
        setValues({ ...values, error: false })
        await signin({ email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false })
                }
                else {
                    authenticate(data, () => {
                        setValues({ ...values, redirect: true })
                    })
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
            <h2>Hi, Dear Welcome Back!!</h2>

        </div>
    )
    const redirectUser = () => {
        if (redirect) {
            if (user && user.role === 1) {
                return <Redirect to="/customer/dashboard" />;
            }
            else if (user && user.role === 2) {
                return <Redirect to="/customersa/dashboard" />
            }
            else if (user && user.role === 3) {
                return <Redirect to="/admin/dashboard" />
            }
        }
        if (isAuthenticated()) {
            return <Redirect to='/' />
        }
    }

    const signInForm = () => (
        <form>
            {showError()}
            {showSuccess()}
            {redirectUser()}
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
            <button onClick={clickSubmit} className="w-100 btn btn-ls my-2 btn-sub" type="submit">Submit</button>
            <p class="mt-2 mb-1 fs-6 ">&copy; 2010–2021 Tickety</p>
        </form>
    )
useEffect(()=>{
    if(isAuthenticated){
        signout(() => {
            <App />
        })
    }
},[])
    return (
        <Auth HeaderPage="SignIn"
            Description="Welcome back!!"
            className="contianer col-md-8 offset-2"
            Childern={signInForm()}
        >
        </Auth>
    )
}

export default Signin