const User = require('../models/user')
const Ticket = require('../models/ticket')



/********************* User Functions *********************/

exports.ticketById = async (req, res, next) => {
    try {
        await Ticket.findById(req.params.id).exec((err, ticket) => {
            if (err || !ticket) {
                return res.status(400).json({
                    message: 'ticket not found'
                })
            }
            res.status(200).json({ ticket });
            next()
        })
    }
    catch (err) {
        console.log(err);
    }
}

exports.submitTicket = async (req, res) => {
    const ticketExist = await Ticket.findById(req.params.id);
    if (!ticketExist) {
        return res.status(404).json({ message: 'The ticket with the given Id was not found' })
    }
    if (ticketExist.submit === true) {
        return res.status(404).json({ message: 'The ticket already submit' })
    }
    const ticket = await Ticket.findByIdAndUpdate(
        req.params.id,
        { submit: true },
        { new: true }
    )
    if (!ticket) {
        return res.status(400).json({ err: 'submit failed!' })
    }

    res.status(200).json({ ticket })

}

exports.listCustomerTicket = async (req, res, next) => {
    try {
        await Ticket.find({ user: { $eq: req.params.id } }).exec((err, ticket) => {
            if (err || !ticket) {
                return res.status(400).json({
                    message: 'tickets not found'
                })
            }
            res.status(200).json({ tickets });
            next()
        })
    }
    catch (err) {
        console.log(err);
    }
}


/********************* Customer Service Agent And Admin Functions *********************/

exports.listAllTickets = async (req, res) => {
    let order = req.query.order ? req.query.order : 'asc';
    await Ticket.find().sort(order).exec((err, allTickets) => {
        if (err || !allTickets) {
            return res.status(400).json({
                message: 'No allTickets'
            })
        }
        return res.status(200).json({ allTickets });
    });
}

exports.listAllTicketsAndUsers= async (req, res, next) => {
    let order = req.query.order ? req.query.order : 'dsc';
    try {
        await Ticket.find()
            .populate('user', 'salt hashed_password')
            .sort({ updatedAt : -1 })
            .exec((err, tickets) => {
                if (err || !tickets) {
                    return res.status(400).json({
                        message: 'tickets not found'
                    })
                }
                res.status(200).json({ tickets });
                next()
            })
    }
    catch (err) {
        console.log(err);
    }
}

exports.changeTicketStatus = async (req, res) => {
    const ticketExist = await Ticket.findById(req.params.id);
    if (!ticketExist) {
        return res.status(404).json({ message: 'The ticket with the given Id was not found' })
    }
    const ticket = await Ticket.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true }
    )
    if (!ticket) {
        return res.status(400).json({ err: 'The ticket cannot be Updated!' })
    }

    res.status(200).json({ ticket })

}

/********************* Admin Only Functions *********************/

exports.countTickets = async (req, res) => {
        const ticketcount = await Ticket.countDocuments();
        if(!ticketcount){
            res.status(500).json({message:'Something wrong in query'})
        }
        res.json({ticketcount:ticketcount})
    }


exports.createNewTicket = async (req, res) => {
    try {
        const user = await User.findById(req.body.user);

        if (await !user || user.role !== 1) {
            return res.status(400).json({ message: 'Invalid User Id' });
        }
        const ticket = await new Ticket(req.body);

        await ticket.save((err, ticket) => {
            if (err) {
                return res.status(400).json({
                    error: err.message
                })
            }
            return res.status(200).json({ ticket });
        })
    } catch (err) {
        console.log(err.message);
    }
}

/********************* All Roles Functions *********************/

exports.addNotesToTicket = async (req, res) => {
    const ticketExist = await Ticket.findById(req.params.id);
    if (!ticketExist) {
        return res.status(404).json({ message: 'The ticket with the given Id was not found' })
    }
    const userId = await User.findById(req.params.userId);
    if (!userId) {
        return res.status(404).json({ message: 'The Writer Unkown.....' })
    } 
    const { write, note } = req.body;
    const ticket = await Ticket.findByIdAndUpdate(
        req.params.id,
        {
            $push: {
                notes: [{
                    write,
                    note
                }
                ]
            }
        },
        { new: true }
    )
    if (!ticket) {
        return res.status(400).json({ err: 'submit failed!' })
    }

    res.status(200).json({ ticket })

}
