import { API } from '../../config/config'

/************************* User  **********************/
export const getUserById = (id, token) => {
    return fetch(`${API}/user/${id}`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(error => console.log(error));
};

export const getAllUser = (token) => {
    return fetch(`${API}/user/`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(error => console.log(error.response.error));
};

export const deleteUser = (userId, token) => {
    return fetch(`${API}/user/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const CountUsers = (token) => {
    return fetch(`${API}/user/count`, {
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
        .catch(error => console.log(error));
};

export const newUser = (user, token) => {
    return fetch(`${API}/user/newAccount`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(error => console.log(error));
};

/************************* Tickets  **********************/
export const CountTickets = (token) => {
    return fetch(`${API}/ticket/count`, {
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
        .catch(error => console.log(error));
};


export const newTicket = (ticket, token) => {
    console.log(ticket)
    return fetch(`${API}/ticket/newTicket`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(ticket)
    })
        .then(response => {
            return response.json();
        })
        .catch(error => console.log(error));
};



