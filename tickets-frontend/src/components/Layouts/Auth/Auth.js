import React from 'react'
import Menu from '../Menu/Menu'
import './Auth.css'

const Auth = ({
    HeaderPage = "Name",
    Description = "Description",
    className,
    Childern
}) => (
    <div >
        <Menu />
        <div className="container">
            <h3 className="header">{HeaderPage}</h3>
            <p className="desc"> {Description}</p>
        </div>
        <div className="container-sm form-window">{Childern}</div>
    </div>
)

export default Auth;