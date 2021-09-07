import React, { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { signout, isAuthenticated } from '../../Auth/index'
import Img from '../../../assets/man.svg'
import './Menu.css'

const isCurrentPage = (history, path) => {
    if (history.location.pathname === path) {
        return {
            color: '#5CDB95',
            borderBottom: "3px solid #5CDB95",
            borderRaduis: '10px'
        }
    }
    else {
        return { color: '#EDF5E1' }
    }
}

const Menu = ({ history }) => {
    return (
        <div className="menu-bar">
            <div className="container d-flex  justify-content-center py-3 mb-4">
                <h1 className="logo d-flex align-items-center mb-3 mb-md-0 me-md-auto">My Tickety</h1>
                <ul className="nav nav-pills">

                    {isAuthenticated() && isAuthenticated().user.role === 1 && (
                        <Fragment>
                            <li className="nav-item">
                                <Link className="nav-link" style={isCurrentPage(history, '/customer/dashboard')} to="/customer/dashboard">MyProfile</Link>
                            </li>

                            <li className="nav-item img-profile">
                                <p className="nav-link" style={{ cursor: 'pointer', color: '#ffffff' }}>{isAuthenticated().user.firstName}</p>
                                <img width="40" height="40" src={Img} alt='avatar' />

                            </li>
                        </Fragment>
                    )}
                    {isAuthenticated() && isAuthenticated().user.role === 2 && (
                        <Fragment>
                            <li className="nav-item">
                                <Link className="nav-link" style={isCurrentPage(history, '/customersa/dashboard')} to="/customersa/dashboard">Agent Dashboard</Link>
                            </li>
                            <li className="nav-item img-profile">
                                <p className="nav-link" style={{ cursor: 'pointer', color: '#ffffff' }}>{isAuthenticated().user.firstName}</p>
                                <img width="40" height="40" src={Img} alt='avatar' />
                            </li>
                        </Fragment>

                    )}
                    {isAuthenticated() && isAuthenticated().user.role === 3 && (
                        <Fragment>
                            <li className="nav-item">
                                <Link className="nav-link" style={isCurrentPage(history, '/admin/dashboard')} to="/admin/dashboard">Admin Dashboard</Link>
                            </li>
                            <li className="nav-item img-profile">
                                <p className="nav-link" style={{ cursor: 'pointer', color: '#ffffff' }}>{isAuthenticated().user.firstName}</p>
                                <img width="40" height="40" src={Img} alt='avatar' />

                            </li>
                        </Fragment>
                    )}
                    {isAuthenticated() && (
                        <li className="nav-item">
                            <span className="nav-link" style={{ cursor: 'pointer', color: '#000000' }}
                                onClick={() => {
                                    signout(() => {
                                        history.push('/');
                                    })
                                }}>Signout</span>
                        </li>

                    )}
                    {!isAuthenticated() && (
                        <Fragment>
                            <li className="nav-item">
                                <Link className="nav-link" style={isCurrentPage(history, '/signin')} to="/signin" >Signin</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" style={isCurrentPage(history, '/register')} to="/register">Register</Link>
                            </li>
                        </Fragment>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default withRouter(Menu);