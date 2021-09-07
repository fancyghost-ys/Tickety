import { API } from '../../config/config'

export const viewAllTickets = (token) => {
    return fetch(`${API}/ticket/allTickets`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const getTicket = (id, token) => {
    return fetch(`${API}/ticket/myTicket/${id}`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const changeTicketStatus = (ticketId, token, newstatus) => {
    return fetch(`${API}/ticket/changestatus/${ticketId}`, {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newstatus)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};