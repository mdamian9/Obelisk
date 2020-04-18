const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    mainWallet: {
        type: { type: Object },
        usd: {
            type: { type: Object },
            name: {
                type: String,
                default: 'United States Dollar'
            },
            ticker: {
                type: String,
                default: 'USD'
            },
            funds: {
                type: Number,
                default: 0
            }
        },
        usdt: {
            type: { type: Object },
            name: {
                type: String,
                default: 'Tether'
            },
            ticker: {
                type: String,
                default: 'USDT'
            },
            funds: {
                type: Number,
                default: 0
            }
        },
        btc: {
            type: { type: Object },
            name: {
                type: String,
                default: 'Bitcoin'
            },
            ticker: {
                type: String,
                default: 'BTC'
            },
            funds: {
                type: Number,
                default: 0
            }
        },
        eth: {
            type: { type: Object },
            name: {
                type: String,
                default: 'Ethereum'
            },
            ticker: {
                type: String,
                default: 'ETH'
            },
            funds: {
                type: Number,
                default: 0
            }
        },
        bnb: {
            type: { type: Object },
            name: {
                type: String,
                default: 'Binance Coin'
            },
            ticker: {
                type: String,
                default: 'BNB'
            },
            funds: {
                type: Number,
                default: 0
            }
        }
    },
    tradingWallet: {
        type: { type: Object },
        usd: {
            type: { type: Object },
            name: {
                type: String,
                default: 'United States Dollar'
            },
            ticker: {
                type: String,
                default: 'USD'
            },
            funds: {
                type: Number,
                default: 0
            }
        },
        usdt: {
            type: { type: Object },
            name: {
                type: String,
                default: 'Tether'
            },
            ticker: {
                type: String,
                default: 'USDT'
            },
            funds: {
                type: Number,
                default: 0
            }
        },
        btc: {
            type: { type: Object },
            name: {
                type: String,
                default: 'Bitcoin'
            },
            ticker: {
                type: String,
                default: 'BTC'
            },
            funds: {
                type: Number,
                default: 0
            }
        },
        eth: {
            type: { type: Object },
            name: {
                type: String,
                default: 'Ethereum'
            },
            ticker: {
                type: String,
                default: 'ETH'
            },
            funds: {
                type: Number,
                default: 0
            }
        },
        bnb: {
            type: { type: Object },
            name: {
                type: String,
                default: 'Binance Coin'
            },
            ticker: {
                type: String,
                default: 'BNB'
            },
            funds: {
                type: Number,
                default: 0
            }
        }
    },
    entryTrades: [
        {
            type: Schema.Types.ObjectId,
            ref: 'EntryTrade'
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Execute before each user.save() call
UserSchema.pre('save', function (callback) {
    let user = this;
    // Break out if the password hasn't changed
    if (!user.isModified('password')) return callback();
    // Hash new password if it has changed
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return callback(err);
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return callback(err);
            user.password = hash;
            callback();
        });
    });
});

// Add method to userSchema to verify user password
UserSchema.methods.verifyPassword = function (password, callback) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
