import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../../Auth';
import Dashboard_Layout from '../../Layouts/Dashboard_Layout/Dashboard_Layout';
import { getAllUser, newTicket } from '../apiAdminCore';
import '../AdminDashboard/AdminDashboard.css'
import { Redirect } from 'react-router';
const NewTicket = () => {
    const { token } = isAuthenticated()
    const [values, setValues] = useState({
        title: '',
        status: '',
        users: [],
        user: '',
        notes: [],
        loading: false,
        error: '',
        createdTicket: '',
        redirectTo: false,
    });

    const {
        title,
        status,
        users,
        user,
        loading,
        error,
        createdTicket,
        redirectTo,
    } = values;

    const init = async () => {
        await getAllUser(token).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    users: data,
                });
            }
        });
    };

    useEffect(() => {
        init();
    }, []);

    const handleChange = name => event => {
        const value = event.target.value;
        setValues({ ...values, [name]: value });
    };


    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });
        newTicket({ title, user, status }, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    title: '',
                    status: '',
                    user: '',
                    loading: false,
                    redirectTo: true,
                    createdTicket: data.name
                });
            }
        });
    };

    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Title</label>
                <input onChange={handleChange('title')} type="text" className="form-control" value={title} />
            </div>

            <div className="form-group">
                <label className="text-muted">User</label>
            </div>
            <select onChange={handleChange('user')} className="form-control">
                <option>Please select</option>
                {
                    users &&
                    users.AllUsers &&
                    users.AllUsers
                        .map((u, i) => (
                            <option key={i} value={u.id}>{u.firstName}</option>
                        ))
                }
            </select>
            <div className="form-group">
                <label className="text-muted">Status</label>
                <select onChange={handleChange('status')} className="form-control">
                    <option>Please select</option>
                    <option value='Active'>Active</option>
                    <option value='Closed'>Closed</option>
                    <option value='Pending'>Pending</option>
                </select>
            </div>
            {
                <button className="btn btn-sub m-3">Create Ticket</button>

            }
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );
    const redirectUser = () => {
        if (redirectTo) {
            return <Redirect to="/admin/dashboard" />;
        }
    };

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdTicket ? '' : 'none' }}>
            <h2>{`${createdTicket}`} is created!</h2>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );
    const childFunction = () => {
        return (
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {redirectUser()}
                    {newPostForm()}
                </div>
            </div>
        )
    }

    return (
        <Dashboard_Layout
            HeaderPage="New Ticket"
            Description={`Create New Ticket`}
            className="form-window"
            childern={childFunction()}
        />
    );
};

export default NewTicket;