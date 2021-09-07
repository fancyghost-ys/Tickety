import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../Auth/index';
import { Redirect } from 'react-router-dom';
import { getTicket, changeTicketStatus } from './apiCustomerSA';
import Dashboard_Layout from '../Layouts/Dashboard_Layout/Dashboard_Layout';
import './CustomerSADashboard.css'

const CustomerEditTicket = ({ match }) => {
    const [values, setValues] = useState({
        status: '',
        redirectToProfile: false,
        formData: ''
    });
    const { user, token } = isAuthenticated();
    const { status, error, redirectToProfile } = values;
    const init = ticketId => {
        getTicket(ticketId, token).then(data => {
            console.log(data)
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    status: data.status
                });
            }
        });
    };

    useEffect(() => {
        init(match.params.ticketId);
    }, []);

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const submitTicketForm = e => {
        e.preventDefault();
        const ticket = {
            status: status
        };
        changeTicketStatus(match.params.ticketId, token, ticket).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    status: data.status,
                    error: false,
                    redirectToProfile: true
                });
            }
        });
    };

    const updateTicketForm = () => (
        <div className="form-window ">
            <form className="mb-5" onSubmit={submitTicketForm}>
                <h4 className="login100-form-title p-b-32 m-b-7">Update Ticket Status</h4>
                <br />
                <br />
                <span className="txt1 p-b-11">Ticket Name</span>
                <div className="wrap- validate-input m-b-36">
                    <input
                        onChange={handleChange('status')}
                        value={status}
                        className="form-control"
                        type="text"
                        required
                        name="name"
                    />
                </div>
                <div className="w-size25">
                    <button type="submit" className="w-100 btn btn-ls my-2 btn-sub">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );

    const showError = () => (
        <div className={'alert alert-danger'} role="alert" style={{ display: error ? '' : 'none' }}>
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            {error}
        </div>
    );

    const redirectUser = () => {
        if (redirectToProfile) {
            if (!error) {
                return <Redirect to="/customersa/dashboard" />;
            }
        }
    };

    const showForm = () => {
        return (
            <div className="row">
                <div className="col-md-8 offset-md-2 m-b-250 mb-5">
                    {showError()}
                    {updateTicketForm()}
                    {redirectUser()}
                </div>
            </div>
        );
    };

    return (
        <Dashboard_Layout
            HeaderPage="Manage By agent"
            Description={`This is Update status Action Page`}
            className="container-fluid"
            childern={showForm()}
        />

    );
};

export default CustomerEditTicket;