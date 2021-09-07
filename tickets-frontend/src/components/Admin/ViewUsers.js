import React, { useState, useEffect } from "react";
import moment from 'moment'
import Moment from 'react-moment'
import { isAuthenticated } from "../Auth/index";
import { deleteUser, getAllUser } from "./apiAdminCore";
import Menu from "../Layouts/Menu/Menu";

const ViewUsers = () => {
    const [values, setValues] = useState([''])
    const {
        user: { _id },
        token
    } = isAuthenticated();
    const init = async () => {
        await getAllUser(token).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setValues(data);
            }
        });
    };
    useEffect(() => {
        init();
    }, []);

    const removeUser = (userId) => {
        deleteUser(userId, token).then(data => {
            if (data.error) {
                console.log(data.error)
            }
            else {
                init();
            }
        })
    }
    return (
        <div className="contianer-fluid">
            <Menu />
            <div className="container">
                <h1 >All Users Information</h1>
                <p >Manage and View details by Admin only</p>
            </div>
            <div className="row">
                <div className="col-12">
                    <ul className="list-group">
                        <hr />
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            <strong className="col">ID</strong>
                            <strong className="col">First Name</strong>
                            <strong className="col">Last Name</strong>
                            <strong className="col">E-mail</strong>
                            <strong className="col">Created At</strong>
                            <strong className="col">Last Update</strong>
                            <strong className="col">Remove</strong>
                        </li>
                        {
                            values && values.AllUsers &&
                            values.AllUsers.map((u, i) => (
                                <li
                                    key={i}
                                    className="list-group-item d-flex"
                                >
                                    <p className="col">{u.id}</p>
                                    <p className="col">{u.firstName}</p>
                                    <p className="col">{u.lastName}</p>
                                    <p className="col">{u.email}</p>
                                    <p className="col">  <Moment format="YYYY/MM/DD">{u.createdAt}</Moment></p>
                                    <p className="col">{moment(u.updatedAt).fromNow()}</p>
                                    <p className="col btn-sm btn-danger" onClick={() => removeUser(u.id)}>Delete</p>
                                </li>
                            ))}
                    </ul>
                    <br />
                </div>
            </div>
        </div>);
};

export default ViewUsers;