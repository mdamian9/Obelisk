const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EntryTradeSchema = new Schema({
    currency: {
        type: String,
        required: true,
        trim: true
    },
    totalInvestment: {
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
    entryPrice: {
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
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('EntryTrade', EntryTradeSchema);
