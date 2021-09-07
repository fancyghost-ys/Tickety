const express = require('express')
const router = express.Router()
const { validate, ticketRules } = require('../validator')
const { 
    ticketById,
    submitTicket,
    listCustomerTicket,
    listAllTickets,
    listAllTicketsAndUsers,
    changeTicketStatus,
    createNewTicket,
    countTickets,
    addNotesToTicket
} = require('../controllers/ticket')
const { isAuth,requireSignin, isCustomerService, isAdmin } = require('../helper/permission')

// Customer Rules
router.get('/myTicket/:id',requireSignin,isAuth, ticketById)
router.get('/customerTickets/:id', requireSignin,isAuth,listCustomerTicket)
router.put('/submit/:id', requireSignin,isAuth,submitTicket)

// Customer Services Agent and Admin
router.get('/', requireSignin,isAuth,isCustomerService,listAllTickets)
router.get('/allTickets', requireSignin,isAuth,isCustomerService,listAllTicketsAndUsers)
router.put('/changestatus/:id', requireSignin,isAuth,isCustomerService,changeTicketStatus)

// by ALL Roles
router.put('/notes/:id', addNotesToTicket)

// Admin Rules only
router.post('/newTicket', [ticketRules, validate],requireSignin,isAuth,isAdmin,createNewTicket)
router.get(`/count`,requireSignin,isAuth,isAdmin ,countTickets)

module.exports = router

