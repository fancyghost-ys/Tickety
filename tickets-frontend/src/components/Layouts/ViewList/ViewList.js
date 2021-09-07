import React from "react";
import { submitTicket } from "../../Customer/apiCoreCustomer";
import moment from 'moment'
import Moment from 'react-moment'
import { isAuthenticated } from "../../Auth";
const ViewList = ({ tickets }) => {
    const {
        user: { _id },
        token
    } = isAuthenticated();
    const changeSubmit = (id) => {
        submitTicket(id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            }
            else {
                console.log(data)
            }
        })
    }
    const updateSubmit = (submit, id) => {
        return submit ? (<span className="btn btn-success">Submitted</span>) :
            (<span className="btn btn-danger" onClick={() => changeSubmit(id)}>Submit Now</span>)
    }
    return (
        <div className="contianer-fluid">
            <div className="row">
                <div className="col-12">
                    <ul className="list-group">
                        <hr />
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            <strong className="col">  Ticket Id</strong>
                            <strong className="col">Title</strong>
                            <strong className="col">Status</strong>
                            <strong className="col">Created At</strong>
                            <strong className="col">Last Update</strong>
                            <strong className="col">Active status</strong>

                        </li>
                        {tickets.tickets.map((p, i) => (
                            <li
                                key={i}
                                className="list-group-item d-flex"
                            >
                                <p class="col">{p.id}</p>
                                <p class="col">{p.title}</p>
                                <p class="col">{p.status}</p>
                                <p class="col">  <Moment format="YYYY/MM/DD">{p.createdAt}</Moment></p>
                                <p class="col">{moment(p.updatedAt).fromNow()}</p>
                                <p class="col">{updateSubmit(p.submit, p.id)}</p>
                            </li>
                        ))}
                    </ul>
                    <br />
                </div>
            </div>
        </div>);
};

export default ViewList;