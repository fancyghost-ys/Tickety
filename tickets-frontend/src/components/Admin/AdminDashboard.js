import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../Auth/index';
import Dashboard_Layout from '../Layouts/Dashboard_Layout/Dashboard_Layout';
import ViewListAgent from '../Layouts/ViewList/ViewListAgent'
import { viewAllTickets } from '../CustomerSA/apiCustomerSA';
import { CountTickets, CountUsers } from './apiAdminCore';
import './AdminDashboard.css'

const AdminDashboard = () => {
    const [tickets, setTickets] = useState([])
    const [showViewListTicket, setshowViewListTicket] = useState(false)
    const [TicketsNo, setTicketsNo] = useState(0)
    const [UsersNo, setUsersNo] = useState(0)
    const {
        user: { _id, firstName, email, role },
        token
    } = isAuthenticated();

    const loadTicketsNo = () => {
        CountTickets(token).then(data => {
            if (data.error) {
                console.log(data.error)
            }
            else {
                setTicketsNo(data);
            }
        })
    }

    const loadUsersNo = () => {
        CountUsers(token).then(data => {
            console.log(data)
            if (data.error) {
                console.log(data.error)
            }
            else {
                setUsersNo(data);
            }
        })
    }

    useEffect(() => {
        loadTicketsNo();
        loadUsersNo();
    }, [])

    const AdminFunctions = () => {
        return (
            <div className="position-sticky pt-3">
                <h4 className="card-header">Admin Functions</h4>
                <ul className="nav flex-column">
                    <li className="list-group-item">
                        <button className="btn" onClick={() => setshowViewListTicket(true)}>
                            View All Tickets
                        </button>
                    </li>
                    <li className="list-group-item">
                        <Link className="btn" to="/admin/createTicket">
                            Create New Ticket
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="btn" to='/admin/createUser'>
                            Create New User
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="btn" to='/admin/viewUsers'>
                            View All Users
                        </Link>
                    </li>
                </ul>
                <div className="card mb-5">
                    <h3 className="card-header">Admin Information</h3>
                    <ul className="list-group">
                        <li className="list-group-item">{firstName}</li>
                        <li className="list-group-item">{email}</li>
                    </ul>
                </div>
            </div>
        );
    };

    const ListTickets = () => {
        viewAllTickets(token).then(data => {
            if (data.error) {
                console.log(data.error);
            }
            else {
                setTickets(data);
            }
        })
    }

    const pagechildern = () => {
        return (
            <div className='m-0 p-0'>
                <div className="title">
                    <h4>Total Users Number is:
                    {UsersNo.countUser}</h4>
                    <h4> Total Ticket Number is: {TicketsNo.ticketcount}</h4></div>
                <div className="row">
                    <div className="col-3">{AdminFunctions()}</div>
                    <div className="col-9">{
                        showViewListTicket && <ViewListAgent tickets={tickets} />
                    }</div>
                </div>
            </div>
        )
    }
    useEffect(() => {
        ListTickets();
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

export default AdminDashboard;



