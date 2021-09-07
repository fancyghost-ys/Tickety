import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../Auth/index';
import Dashboard_Layout from '../Layouts/Dashboard_Layout/Dashboard_Layout';
import { getAllMyTickets } from './apiCoreCustomer';
import ViewList from '../Layouts/ViewList/ViewList'
import './CustomerDashboard.css'

const CustomerDashboard = () => {
    const [tickets, setTickets] = useState([])
    const [showViewListTicket, setshowViewListTicket] = useState(false)
    const {
        user: { _id, firstName, email, role },
        token
    } = isAuthenticated();
    const CustomerLinks = () => {
        return (
            <div className="position-sticky pt-3">
                <h4 className="card-header">Customer Options</h4>
                <ul className="nav flex-column">
                    <li className="list-group-item">
                        <button className="btn" onClick={() => setshowViewListTicket(true)}>
                            View All My Tickets
                        </button>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/submit_ticket">
                            Add Note Tickets
                        </Link>
                    </li>
                </ul>
                <div className="card mb-5">
                    <h3 className="card-header">Customer Information</h3>
                    <ul className="list-group">
                        <li className="list-group-item">{firstName}</li>
                        <li className="list-group-item">{email}</li>
                    </ul>
                </div>
            </div>
        );
    };
    const viewAllTickets = () => {
        getAllMyTickets(_id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            }
            else {
                console.log(data)
                setTickets(data);
            }
        })
    }
    const pagechildern = () => {
        return (
            <div className="row">
                <div className="col-3">{CustomerLinks()}</div>
                <div className="col-9">{
                    showViewListTicket && <ViewList tickets={tickets} />
                }</div>
            </div>
        )
    }
    useEffect(() => {
        viewAllTickets();
    }, [])
    return (
        <Dashboard_Layout
            HeaderPage="Dashboard"
            Description={`Have a Nice time ${firstName}!`}
            className="container-fluid"
            childern={pagechildern()}
        />
    );
};


export default CustomerDashboard;
