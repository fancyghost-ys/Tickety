import React, { useEffect, useState } from 'react'
import { isAuthenticated } from '../../Auth';
import Menu from '../../Layouts/Menu/Menu'
import { addNotesToTicket, getMyTicket } from '../apiCoreCustomer';
import moment from 'moment'
import Moment from 'react-moment'
import './TicketInfo.css'

const TicketInfo = ({ match }) => {
    const [Ticket, setTicket] = useState({})
    const [notes, setNotes] = useState([]);
    const [showNotesBar, setShowNotesBar] = useState(false);
    const {
        user: { firstName, role },
        token
    } = isAuthenticated();

    const [values, setValues] = useState({
        write: firstName,
        note: '',
        error: '',
        success: false
    })

    const { write, note, success, error } = values

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }
    const clickSubmit = async (event) => {
        event.preventDefault()
        let Id = match.params.ticketId;
        if (note != '') {
            setValues({ ...values, error: false })
            await addNotesToTicket(Id, token, { write, note })
                .then(data => {
                    if (data.error) {
                        setValues({ ...values, error: data.error, success: false })
                    }
                    else {
                        setValues({ ...values, note: '', error: '', success: true, })
                    }
                })
        }
        else {
            setValues({ ...values, note: '', error: 'Please Enter Your Message', success: false, })

        }
    }
    const showError = () => (
        <div className="alert alert-danger fs-6 h-1" height="4" style={{ display: error ? '' : 'none' }}>
            <p>x {error}</p>
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            <h2>Hi, Dear</h2>
            <p>Notes Send Successfully</p>
        </div>
    )
    const loadingTicketInfo = async (ticketId) => {
        await getMyTicket(ticketId, token).then(data => {
            if (data.error) {
                console.log(data.error)
            }
            else {
                console.log(data)
                setTicket(data);
            }
        })
    }
    const Notes = () => {
        return (
            <div className="col-3 float-end">
                <div className="position-sticky pt-3">
                    <h4 className="card-header">Enter Your Message</h4>
                    <ul className="nav flex-column">
                        {showError()}
                        {showSuccess()}
                        <li className="list-group-item">
                            <div className="form-group">
                                <label className="text-muted fs-5">Message</label>
                                <input onChange={handleChange('note')} type="text" className="form-control"
                                    value={note}
                                />
                            </div>
                            <button onClick={clickSubmit} class="w-100 btn btn-ls my-2 btn-sub" type="submit">Submit</button>

                        </li>
                    </ul>
                </div>
            </div>
        );
    }
    useEffect(() => {
        const ticketId = match.params.ticketId;
        loadingTicketInfo(ticketId);
    }, [])

    return (
        <div>
            <Menu />
            <div className="row">
                <h4 className="p-4">Ticket Information</h4>
                {
                    showNotesBar && Notes()
                }

                <div className="myTicket">
                    <div className="ticketHeader">My Ticket</div>

                    <div className="card-body ticketBody">
                        {[Ticket].map((t, i) => (
                            <div>
                                <p><strong>Ticket ID:</strong> <span key={i}>{t.id}</span></p>
                                <p><strong>Ticket Title:</strong><span key={i}>{t.title}</span></p>
                                <p><strong>Status:</strong> <span key={i}>{t.status}</span> </p>
                                <p><strong>Submitted status:</strong> <span key={i}>{t.submit}</span></p>
                                <p><strong >CreatedAt:</strong> <span key={i}><Moment format="YYYY/MM/DD">{t.createdAt}</Moment></span></p>
                                <p><strong>LastUpdate</strong> <span key={i}>{moment(t.updatedAt).fromNow()}</span></p>
                                <button className="float-end btn btn-success" onClick={() => { setShowNotesBar(!showNotesBar) }}>Notes</button>
                            </div>

                        ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};


export default TicketInfo;
