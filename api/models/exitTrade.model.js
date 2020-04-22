const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExitTradeSchema = new Schema({
    currency: {
        type: String,
        required: true,
        trim: true
    },
    totalDivestment: {
        type: Number,
        required: true,
        trim: true
    },
    coinName: {
        type: String,
        required: true,
        trim: true
    },
    tradingPair: {
        type: String,
        required: true,
        trim: true
    },
    exitPrice: {
        type: Number,
        required: true,
        trim: true
    },
    totalCoins: {
        type: Number,
        required: true,
        trim: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    entryTrade: {
        type: Schema.Types.ObjectId,
        ref: 'EntryTrade',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ExitTrade', ExitTradeSchema)