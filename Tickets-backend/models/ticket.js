const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            unique: true,
            required: true,
        },
        status: {
            type: String,
            required: true,
            default: 'Active'
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        notes: [{
            write: { type: String },
            note: { type: String }
        }],
        submit: {
            type: Boolean,
            default: false
        }
    }, { timestamps: true }
);

ticketSchema.method('toJSON', function () {
    const { __V, ...object } = this.toObject();
    const { _id: id, ...result } = object;
    return { ...result, id };
});

module.exports = mongoose.model('Ticket', ticketSchema);